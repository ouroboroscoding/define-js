/**
 * Node
 *
 * Represents a data node of a specific type, this type of node has no children
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */

// Ouroboros modules
import clone from '@ouroboros/clone';
import { combine, isInteger, isObject } from '@ouroboros/tools';

// Import modules
import Base from './Base';
import Decimal from './Decimal';

// Import helpers
import { compareIPs, dateTimeToStr, dateToStr, strToInt } from './helpers';
import constants from './constants';

// Types
import { MinMax } from './Types';

/**
 * Node
 *
 * Handles single elements of data
 *
 * @name Node
 * @access public
 * @extends Base
 */
export default class Node extends Base {

	// A regular expression defining a valid value
	_regex: RegExp | null;

	// The minimum value allowed for the node
	_minimum: any;

	// The maximum value allowed for the node
	_maximum: any;

	// A list of valid options for the node
	_options: any[] | null;

	// The type of node
	_type: string;

	/**
	 * Constructor
	 *
	 * Initialises the instance
	 *
	 * @name Node
	 * @access public
	 * @param details Node structure
	 * @param extend Extend the base node structure, if false, don't copy the
	 *  base node structure details
	 * @return a new instance
	 */
	constructor(details: Record<string, any> | string, extend?: Record<string, any> | false) {

		// Init the details
		let oDetails: Record<string, any>;

		// If we got a string
		if(typeof details === 'string') {

			// If we got no extend or it's false
			if(extend === undefined || extend === false) {
				oDetails = {__type__: details}
			}

			// Else, we have an extend value
			else {

				// If it's an object
				if(isObject(extend)) {

					// Store the details by making a new object from the details
					//	and the extend
					oDetails = combine(
						{__type__: details},
						extend
					);
				}

				// Else, we got some invalid value
				else {
					throw new Error('extend must be an Object or false');
				}
			}
		}

		// Else, if we got an object
		else if(isObject(details)) {

			// If we have no extend at all
			if(extend === undefined) {

				// Make a copy of the details so we don't screw up the original
				//	object
				oDetails = clone(details);
			}

			// Else, we have an extend value
			else {

				// If it's an object
				if(isObject(extend)) {

					// Store the details by making a new object from the details and
					//	the extend
					oDetails = combine(details, extend as Record<string, any>);
				}

				// Else, if it's false
				else if(extend === false) {

					// Just use the details as is, don't copy it
					oDetails = details;
				}

				// Else, we got some sort of invalid value for extend
				else {
					throw new Error('extend must be an Object or false');
				}
			}
		}

		// Else, we got invalid details
		else {
			throw new Error('"details" must be an Object or a String');
		}

		// If the type is not found
		if(!('__type__' in oDetails)) {
			throw new Error('missing "__type__" in details');
		}

		// If the type is not valid
		if(constants.nodes.indexOf(oDetails.__type__) === -1) {
			throw new Error('invalid "__type__" in details');
		}

		// Call the parent constructor
		super(oDetails, 'Node');

		// Store the type
		this._type = oDetails.__type__;

		// Init the value constants
		this._regex = null;
		this._options = null;
		this._minimum = null;
		this._maximum = null;

		// If there's a regex string available
		if('__regex__' in oDetails) {
			this.regex(oDetails.__regex__);
		}

		// Else if there's a list of options
		else if('__options__' in oDetails) {
			this.options(oDetails.__options__);
		}

		// Else
		else {

			// If there's a min or max
			const bMin = '__minimum__' in oDetails;
			const bMax = '__maximum__' in oDetails;

			if(bMin || bMax) {
				this.minmax(
					(bMin ? oDetails.__minimum__ : null),
					(bMax ? oDetails.__maximum__ : null)
				);
			}
		}
	}

	/**
	 * Clean
	 *
	 * Cleans and returns the new value
	 *
	 * @name clean
	 * @access public
	 * @param value The value to clean
	 * @return the cleaned value
	 */
	clean(value?: any, level?: string[]): any {

		// If the value is null and it's optional, return as is
		if(value === null && this._optional) {
			return null;
		}

		// If it's an ANY, there is no reasonable expectation that we know
		//	what the value should be, so we return it as is
		if(this._type === 'any') {
			//pass
		}

		// Else if it's a basic string type
		else if(['base64', 'ip', 'string', 'uuid',
				'uuid4'].indexOf(this._type) !== -1) {

			// And not already a string
			if(typeof value !== 'string') {
				value = String(value);
			}
		}

		// Else if it's a BOOL just check if the value flags as positive
		else if(this._type === 'bool') {

			// If it's specifically a string, it needs to match a specific
			//	pattern to be true
			if(typeof value === 'string') {
				value = (
					['true', 'True', 'TRUE', 't', 'T', 'yes',
						'Yes', 'YES', 'y', 'Y', 'x', '1'
						].indexOf(value) === -1
				) ? false : true;
			}
			else {
				value = value ? true : false;
			}
		}

		// Else if it's a date type
		else if(this._type === 'date') {

			// If it's a JavaScript type, convert it to a string
			if(value instanceof Date) {
				value = dateToStr(value);
			}

			// Else if it's already a string
			else if(typeof value === 'string') {
				//pass
			}

			// Else convert it to a string
			else {
				value = String(value);
			}
		}

		// Else if it's a datetime type
		else if(this._type === 'datetime') {

			// If it's a JavaScript type, convert it to a string
			if(value instanceof Date) {
				value = dateTimeToStr(value);
			}

			// Else if it's already a string
			else if(typeof value === 'string') {
				//pass
			}

			// Else convert it to a string
			else {
				value = String(value);
			}
		}

		// Else if it's a decimal
		else if(this._type === 'decimal') {

			// If it's not already a Decimal
			if(!(value instanceof Decimal)) {
				value = new Decimal(value);
			}

			// Convert it to a string
			value = value.toString();
		}

		// Else if it's a float
		else if(this._type === 'float') {
			value = parseFloat(value);
		}

		// Else if it's an int type
		else if(['int', 'timestamp', 'uint'].indexOf(this._type) !== -1) {

			// If it's a string
			if(typeof value === 'string') {
				value = strToInt(value);
			}

			// Else if it's not an int already
			else if(!isInteger(value)) {
				value = parseInt(value, 10);
			}
		}

		// Else if it's a JSON type
		else if(this._type === 'json') {

			// If it's already a string
			if(typeof value === 'string') {
				//pass
			}

			// Else, encode it
			else {
				value = JSON.stringify(value);
			}
		}

		// Else if it's an md5 type
		else if(this._type === 'md5') {

			// If it's a string
			if(typeof value === 'string') {
				//pass
			}

			// Else, try to convert it to a string
			else {
				value = String(value);
			}
		}

		// Else if it's a price type
		else if(this._type === 'price') {

			// If it's not already a Decimal
			if(!(value instanceof Decimal)) {
				value = new Decimal(value);
			}

			// Make sure its got 2 decimal places
			value = value.toFixed(2);
		}

		// Else if it's a time type
		else if(this._type === 'time') {

			// If it's a JavaScript type, get the time part
			if(value instanceof Date) {
				value = value.toTimeString().substring(0,8);
			}

			// Else if it's already a string
			else if(typeof value === 'string') {
				//pass
			}

			// Else convert it to a string
			else {
				value = String(value);
			}
		}

		// Else we probably forgot to add a new type
		else {
			throw new Error(
				`"${this._type}" has not been added to .clean()`
			);
		}

		// Return the cleaned value
		return value;
	}

	/**
	 * Min/Max
	 *
	 * Sets or gets the minimum and/or maximum values for the Node. For
	 * getting, returns { "minimum": mixed, "maximum": mixed }
	 *
	 * @name minmax
	 * @access public
	 * @param minimum The minimum value
	 * @param maximum The maximum value
	 * @return the current min / max on get, or void for set
	 */
	minmax(minimum?: any, maximum?: any): MinMax | void {

		// If neither min or max is set, this is a getter
		if(minimum === undefined && maximum === undefined) {
			return {
				minimum: this._minimum,
				maximum: this._maximum
			};
		}

		// If the minimum is set
		if(minimum !== null) {

			// If it's undefined
			if(minimum === undefined) {
				throw new Error(
					'"minimum" can only be undefined if "maximum" is also undefined'
				);
			}

			// If the current type is a date, datetime, ip, or time
			if(['date', 'datetime', 'ip', 'time'].indexOf(this._type) !== -1) {

				// Make sure the value is valid for the type
				if(typeof minimum !== 'string' ||
					!constants.regex[this._type as keyof typeof constants.regex].test(minimum)) {
					throw new Error(
						`"__minimum__" is not valid for the current type: "${this._type}"`
					);
				}
			}

			// Else if the type is an int (unsigned, timestamp), or a string
			//	in which the minimum/maximum are lengths
			else if(['base64', 'int', 'string', 'timestamp',
					'uint'].indexOf(this._type) !== -1) {

				// If the value is not a valid int or long
				if(!isInteger(minimum)) {

					// If it's a valid representation of an integer
					if(typeof minimum === 'string' &&
						constants.regex.int.test(minimum)) {
						minimum = strToInt(minimum);
					}

					// Else, raise an error
					else {
						throw new Error('"__minimum__" must be an integer');
					}

					// If the type is meant to be unsigned
					if(['base64', 'string', 'timestamp',
						'uint'].indexOf(this._type) !== -1) {

						// And it's below zero
						if(minimum < 0) {
							throw new Error(
								'"__minimum__" must be an unsigned integer'
							);
						}
					}
				}
			}

			// Else if the type is a decimal
			else if(this._type === 'decimal') {

				// If it's already a Decimal
				if(minimum instanceof Decimal) {
					//pass
				}

				// If it's a valid representation of a decimal
				else if(typeof minimum === 'string' &&
						constants.regex.decimal.test(minimum)) {
					minimum = new Decimal(minimum);
				}

				// Else it's a bad value
				else {
					throw new Error('"__minimum__" not a valid decimal');
				}
			}

			// Else if the type is float
			else if(this._type === 'float') {

				// If it's already a float
				if(typeof minimum === 'number') {
					//pass
				}

				// If it's a valid representation of a float
				else if(typeof minimum === 'string' &&
						constants.regex.decimal.test(minimum)) {
					minimum = parseFloat(minimum);
				}

				// Else it's a bad value
				else {
					throw new Error('"__minimum__" not a valid float');
				}
			}

			// Else if the type is price
			else if(this._type === 'price') {

				// If it's already a Decimal
				if(minimum instanceof Decimal) {
					//pass
				}

				// If it's a valid representation of a decimal
				else if(typeof minimum === 'string' &&
						constants.regex.price.test(minimum)) {
					minimum = new Decimal(minimum);
				}

				// Else it's a bad value
				else {
					throw new Error('"__minimum__" not a valid price');
				}
			}

			// Else we can't have a minimum
			else {
				throw new Error(
					`can not set __minimum__ for "${this._type}"`
				);
			}

			// Store the minimum
			this._minimum = minimum;
		}

		// If the maximum is set
		if(maximum !== null) {

			// If it's undefined
			if(maximum === undefined) {
				throw new Error(
					'"maximum" can only be undefined if "minimum" is also undefined'
				);
			}

			// If the current type is a date, datetime, ip, or time
			if(['date', 'datetime', 'ip', 'time'].indexOf(this._type) !== -1) {

				// Make sure the value is valid for the type
				if(typeof maximum !== 'string' ||
					!constants.regex[this._type as keyof typeof constants.regex].test(maximum)) {
					throw new Error(
						`"__maximum__" is not valid for the current type: "${this._type}"`
					);
				}
			}

			// Else if the type is an int (unsigned, timestamp), or a string
			//	in which the minimum/maximum are lengths
			else if(['base64', 'int', 'string', 'timestamp',
					'uint'].indexOf(this._type) !== -1) {

				// If the value is not a valid int or long
				if(!isInteger(maximum)) {

					// If it's a valid representation of an integer
					if(typeof maximum === 'string' &&
						constants.regex.int.test(maximum)) {
						maximum	= strToInt(maximum);
					}

					// Else, raise an error
					else {
						throw new Error('"__maximum__" must be an integer');
					}

					// If the type is meant to be unsigned
					if(['base64', 'string', 'timestamp',
						'uint'].indexOf(this._type) !== -1) {

						// And it's below zero
						if(maximum < 0) {
							throw new Error(
								'"__maximum__" must be an unsigned integer'
							);
						}
					}
				}
			}

			// Else if the type is decimal
			else if(this._type === 'decimal') {

				// If it's already a Decimal
				if(maximum instanceof Decimal) {
					//pass
				}

				// If it's a valid representation of a decimal
				else if(typeof maximum === 'string' &&
						constants.regex.decimal.test(maximum)) {
					maximum = new Decimal(maximum);
				}

				// Else it's a bad value
				else {
					throw new Error('"__maximum__" not a valid decimal');
				}
			}

			// Else if the type is float
			else if(this._type === 'float') {

				// If it's already a float
				if(typeof maximum === 'number') {
					//pass
				}

				// If it's a valid representation of a float
				else if(typeof maximum === 'string' &&
						constants.regex.decimal.test(maximum)) {
					maximum = parseFloat(maximum);
				}

				// Else it's a bad value
				else {
					throw new Error('"__maximum__" not a valid float');
				}
			}

			// Else if the type is price
			else if(this._type === 'price') {

				// If it's already a Decimal
				if(maximum instanceof Decimal) {
					//pass
				}

				// If it's a valid representation of a decimal
				else if(typeof maximum === 'string' &&
						constants.regex.price.test(maximum)) {
					maximum = new Decimal(maximum);
				}

				// Else it's a bad value
				else {
					throw new Error('"__maximum__" not a valid price');
				}
			}

			// Else we can't have a minimum
			else {
				throw new Error(
					`can not set __maximum__ for "${this._type}"`);
			}

			// If we also have a minimum
			if(this._minimum !== null) {

				// If the type is an IP
				if(this._type === 'ip') {

					// If the min is above the maximum, we have a problem
					if(compareIPs(this._minimum, maximum) === 1) {
						throw new Error(
							'"__maximum__" can not be below "__minimum__"'
						);
					}
				}

				// Else any other data type
				else {

					// If the min is above the maximum, we have a problem
					if(this._minimum > maximum) {
						throw new Error(
							'"__maximum__" can not be below "__minimum__"'
						);
					}
				}
			}

			// Store the maximum
			this._maximum = maximum;
		}
	}

	/**
	 * Options
	 *
	 * Sets or gets the list of acceptable values for the Node
	 *
	 * @name options
	 * @access public
	 * @param opts An array of valid values for the node when setting
	 * @return void | Array
	 */
	options(opts?: any[]): any[] | null | void {

		// If opts aren't set, this is a getter
		if(opts === undefined) {
			return this._options;
		}

		// Else this is a setter
		else {

			// If the options are not an Array
			if(!Array.isArray(opts)) {
				throw new Error('"__options__" must be an array');
			}

			// If the type is not one that can have options
			if(['base64', 'date', 'datetime', 'decimal',
					'float', 'int', 'ip', 'md5', 'price', 'string',
					'time', 'timestamp', 'uint', 'uuid', 'uuid4'
				].indexOf(this._type) === -1) {
				throw new Error(
					`can not set __options__ for "${this._type}"`);
			}

			// Init the array of options to be saved
			const aOpts = [];

			// Go through each item and make sure it's unique and valid
			for(let i = 0; i < opts.length; ++i) {

				// Convert the value based on the type
				// If the type is a string one that we can validate
				if(['base64', 'date', 'datetime', 'ip', 'md5', 'time', 'uuid', 'uuid4'].indexOf(this._type) !== -1) {

					// If the value is not a string or doesn't match its regex,
					//	throw an error
					if(typeof opts[i] !== 'string' ||
							!constants.regex[this._type as keyof typeof constants.regex].test(opts[i])) {
						throw new Error(
							`"__options__[${i}]" is not valid for "${this._type}"`
						);
					}
				}

				//	Else if it's decimal
				else if(this._type === 'decimal') {

					// If it's a Decimal
					if(opts[i] instanceof Decimal) {
						//pass
					}

					// Else if we can't convert it
					else {
						try {
							opts[i] = new Decimal(opts[i]);
						} catch(err) {
							throw new Error(
								`"__options__[${i}]" not a valid decimal`
							);
						}
					}
				}

				// Else if it's a float
				else if(this._type === 'float') {

					// If it's not a float
					if(typeof opts[i] !== 'number') {

						// If we can't convert it to a float
						opts[i] = parseFloat(opts[i]);
						if(isNaN(opts[i])) {
							throw new Error(
								`"__options__[${i}]" not a valid float`
							);
						}
					}
				}

				// Else if it's an integer
				else if(['int', 'timestamp', 'uint'].indexOf(this._type) !== -1) {

					// If we don't already have an int
					if(!isInteger(opts[i])) {

						// If it's a valid representation of an integer
						if(typeof opts[i] === 'string' &&
								constants.regex.int.test(opts[i])) {
							opts[i]	= strToInt(opts[i]);
						}

						// Else, raise an error
						else {
							throw new Error(
								`"__options__[${i}]" must be an integer`
							);
						}
					}

					// If the type is unsigned and negative, raise an error
					if(['timestamp', 'uint'].indexOf(this._type) !== -1 &&
							opts[i] < 0) {
						throw new Error(
							`"__options__[${i}]" must be an unsigned integer`
						);
					}
				}

				//	Else if it's a price
				else if(this._type === 'price') {

					// If it's a Decimal
					if(opts[i] instanceof Decimal) {
						//pass
					}

					// Else if it's not a valid price representation
					else if(typeof opts[i] !== 'string' ||
							!constants.regex.price.test(opts[i])) {
						throw new Error(
							`"__options__[${i}]" not a valid price`
						);
					}

					// Store it as a Decimal
					opts[i] = new Decimal(opts[i])
				}

				// Else if the type is a string
				else if(this._type === 'string') {

					// If the value is not a string, convert it
					if(typeof opts[i] !== 'string') {
						opts[i]	= String(opts[i]);
					}
				}

				// Else, we have no validation for the type
				else {
					throw new Error(
						`can not set __options__ for "${this._type}"`
					);
				}

				// If it's already in the list, raise an error
				if(aOpts.indexOf(opts[i]) !== -1) {
					throw new Error('"__options__[' + i + '] is a duplicate');
				}

				// Store the option
				else {
					aOpts.push(opts[i]);
				}
			}

			// Store the list of options
			this._options = aOpts;
		}
	}

	/**
	 * Regex
	 *
	 * Sets or gets the regular expression used to validate the Node
	 *
	 * @name regex
	 * @access public
	 * @param regex A regular expression string or object
	 * @return void | RegExp
	 */
	regex(regex?: RegExp | string): RegExp | null | void {

		// If regex was not set, this is a getter
		if(regex === undefined) {
			return this._regex;
		}

		// Else this is a setter
		else {

			// If the type is not a string
			if(['decimal', 'int', 'price', 'string', 'timestamp',
				'uint'].indexOf(this._type) === -1) {
				throw new Error(
					'can not set __regex__ for "' + this._type + '"'
				);
			}

			// If it's not a valid regex
			if(!(regex instanceof RegExp)) {

				// And it's not a string
				if(typeof regex !== 'string') {
					throw new Error(
						'"__regex__" must be a valid string or RegExp'
					);
				}

				// Turn the string into a RegExp
				regex = new RegExp(regex);
			}

			// Store the regex
			this._regex = regex;
		}
	}

	/**
	 * To Object
	 *
	 * Returns the Node as an Object in the same format as is used in
	 * constructing it
	 *
	 * @name toObject
	 * @access public
	 * @return an object that can be converted to JSON
	 */
	toObject(): Record<string, any> {

		// Init the Object we will return
		const oRet: Record<string, any> = {
			__type__: this._type
		}

		// If there is a regex associated, add it
		if(this._regex) {
			const s = String(this._regex);
			oRet.__regex__ = s.substring(1, s.length-1);
		}

		// Else if there were options associated, add them
		else if(this._options) {
			oRet.__options__ = this._options;
		}

		// Else check for min and max and add if either are found
		else {
			if(this._minimum) {
				oRet.__minimum__ = this._minimum;
			}
			if(this._maximum) {
				oRet.__maximum__ = this._maximum;
			}
		}

		// Get the parents Object and add it to the return
		const oBasic = super.toObject();
		for(const k of Object.keys(oBasic)) {
			oRet[k] = oBasic[k];
		}

		// Return
		return oRet;
	}

	/**
	 * Type
	 *
	 * Returns the type of Node this is
	 *
	 * @name type
	 * @access public
	 * @return the type of node
	 */
	type(): string {
		return this._type;
	}

	/**
	 * Valid
	 *
	 * Checks if a value is valid based on the instance's values
	 *
	 * @name valid
	 * @access public
	 * @param value The value to validate
	 * @param level Names of parents to this node
	 * @return if the value is valid or not
	 */
	valid(value: any | null, level?: string[]): boolean {

		// Reset validation failures
		this.validationFailures = [];

		// If level is not passed
		if(level === undefined) {
			level = [];
		}

		// If the value is null
		if(value === null) {

			// If it's optional, we're good
			if(this._optional) {
				return true;
			}

			// Invalid value
			this.validationFailures.push([level.join('.'), 'missing']);
			return false;
		}

		// If we are validating an ANY field, immediately return true
		if(this._type === 'any') {
			//pass
		}

		// If we are validating a DATE, DATETIME, IP or TIME data point
		else if(['base64', 'date', 'datetime', 'ip', 'md5', 'time', 'uuid',
				'uuid4'].indexOf(this._type) !== -1) {

			// If it's a date and the value is a JavaScript Date
			if(this._type === 'date' && value instanceof Date) {
				value = dateToStr(value);
			}

			// Else if it's a datetime and the value is a JavaScript Date
			else if(this._type === 'datetime' && value instanceof Date) {
				value = dateTimeToStr(value);
			}

			// Else if it's a time and the value is a JavaScript Date
			else if(this._type === 'time' && value instanceof Date) {
				value = value.toTimeString().substring(0,8);
			}

			// If the value is not a string
			else if(typeof value !== 'string') {
				this.validationFailures.push([level.join('.'), 'not a string']);
				return false;
			}

			// If there's no match
			if(!constants.regex[this._type as keyof typeof constants.regex].test(value)) {
				this.validationFailures.push([level.join('.'), 'invalid']);
				return false;
			}

			// If we're checking an IP
			if(this._type === 'ip') {

				// If there's a min or a max
				if(this._minimum !== null || this._maximum !== null) {

					// If the IP is greater than the maximum
					if(this._maximum !== null && compareIPs(value, this._maximum) === 1) {
						this.validationFailures.push(
							[level.join('.'), 'exceeds maximum']
						);
						return false;
					}

					// If the IP is less than the minimum
					if(this._minimum !== null && compareIPs(value, this._minimum) === -1) {
						this.validationFailures.push(
							[level.join('.'), 'did not meet minimum']
						);
						return false;
					}

					// Return OK
					return true;
				}
			}
		}

		// Else if we are validating some sort of integer
		else if(['int', 'timestamp', 'uint'].indexOf(this._type) !== -1) {

			// If the type is a bool, fail immediately
			if(typeof value === 'boolean') {
				this.validationFailures.push([level.join('.'), 'is a bool']);
				return false;
			}

			// If it's not an int
			if(!isInteger(value)) {

				// And it's a valid representation of an int
				if(typeof value === 'string' &&
					constants.regex.int.test(value)) {
					value = strToInt(value);
				}

				// Else, return false
				else {
					this.validationFailures.push(
						[level.join('.'), 'not an integer']
					);
					return false;
				}
			}

			// If it's not signed
			if(['timestamp', 'uint'].indexOf(this._type) !== -1) {

				// If the value is below 0
				if(value < 0) {
					this.validationFailures.push([level.join('.'), 'signed']);
					return false;
				}
			}
		}

		// Else if we are validating a bool
		else if(this._type === 'bool') {

			// If it's already a bool
			if(typeof value === 'boolean') {
				return true;
			}

			// If it's an int or long at 0 or 1
			if(isInteger(value) && [0, 1].indexOf(value) !== -1) {
				return true;
			}

			// Else if it's a string
			else if(typeof value === 'string') {

				// If it's t, T, 1, f, F, or 0
				if(['true', 'true', 'TRUE', 't', 'T', '1', 'false', 'false',
					'FALSE', 'f', 'F', '0'].indexOf(value) !== -1) {
					return true;
				} else {
					this.validationFailures.push(
						[level.join('.'),
							'not a valid string representation of a bool']
					);
					return false;
				}
			}

			// Else it's no valid type
			else {
				this.validationFailures.push(
					[level.join('.'), 'not valid bool replacement']
				);
				return false;
			}
		}

		// Else if we are validating a decimal value
		else if(this._type === 'decimal') {

			// If the type is a bool, fail immediately
			if(typeof value === 'boolean') {
				this.validationFailures.push([level.join('.'), 'is a bool']);
				return false;
			}

			// If it's already a Decimal
			if(value instanceof Decimal) {
				//pass
			}

			// Else if we fail to convert the value
			else {
				try {
					value = new Decimal(value);
				} catch(err) {
					this.validationFailures.push(
						[level.join('.'), 'can not be converted to decimal']
					);
					return false;
				}
			}

			// If there's options
			if(this._options) {

				// Go through each one
				for(const d of this._options) {

					// If they match, return OK
					if(value.equals(d)) {
						return true;
					}
				}
			}

			// Else if there's a min or max
			else if(this._minimum !== null || this._maximum !== null) {

				// If there's a minimum and we don't reach it
				if(this._minimum !== null && value.lessThan(this._minimum)) {
					this.validationFailures.push(
						[level.join('.'), 'not long enough']
					);
					return false;
				}

				// If there's a maximum and we surpass it
				if(this._maximum !== null && value.greaterThan(this._maximum)) {
					this.validationFailures.push([level.join('.'), 'too long']);
					return false;
				}

				// Return OK
				return true;
			}
		}

		// Else if we are validating a floating point value
		else if(this._type === 'float') {

			// If the type is a bool, fail immediately
			if(typeof value === 'boolean') {
				this.validationFailures.push([level.join('.'), 'is a bool']);
				return false;
			}

			// If it's already a float
			if(typeof value === 'number') {
				//pass
			}

			// Else if it's a string
			else if(typeof value === 'string') {

				// If it's an invalid representation
				if(!constants.regex.decimal.test(value)) {
					this.validationFailures.push(
						[level.join('.'), 'failed regex (internal)']
					);
					return false;
				}

				// Parse it
				value = parseFloat(value);
			}

			// Else it's some other value, try to parse it
			else {
				value = parseFloat(value);
				if(isNaN(value)) {
					this.validationFailures.push(
						[level.join('.'), 'can not be converted to float']
					);
					return false;
				}
			}
		}

		// Else if we are validating a JSON string
		else if(this._type === 'json') {

			// If it's already a string
			if(typeof value === 'string') {

				// Try to decode it
				try {
					JSON.parse(value);
					return true;
				}
				catch(err) {
					this.validationFailures.push(
						[level.join('.'), 'Can not be decoded from JSON']
					);
					return false;
				}
			}

			// Else
			else {

				// Try to encode it
				try {
					value = JSON.stringify(value);
					return true;
				}
				catch(err) {
					this.validationFailures.push(
						[level.join('.'), 'Can not be encoded to JSON']
					);
					return false;
				}
			}
		}

		// Else if we are validating a price value
		else if(this._type === 'price') {

			// If the type is a bool, fail immediately
			if(typeof value === 'boolean') {
				this.validationFailures.push([level.join('.'), 'is a bool']);
				return false;
			}

			// If it's not already a Decimal
			if(!(value instanceof Decimal)) {

				// If it's a string
				if(typeof value === 'string') {

					// If it doesn't match the regex
					if(!constants.regex.price.test(value)) {
						this.validationFailures.push(
							[level.join('.'), 'invalid']
						);
						return false;
					}

					// Convert it to a Decimal
					value = new Decimal(value);
				}

				// Else if it's a number, convert it to a Decimal
				else if(typeof value === 'number') {
					value = new Decimal(value);
				}

				// Else it can't be converted
				else {
					this.validationFailures.push(
						[level.join('.'), 'can not be converted to price']
					);
					return false;
				}
			}

			// If there's too many decimal points
			if(value.decimalPlaces() > 2) {
				this.validationFailures.push(
					[level.join('.'), 'too many decimal points']
				);
				return false;
			}

			// If there's options
			if(this._options) {

				// Go through each one
				for(const d of this._options) {

					// If they match, return OK
					if(value.equals(d)) {
						return true;
					}
				}
			}

			// Else if there's a min or max
			else if(this._minimum !== null || this._maximum !== null) {

				// If there's a minimum and we don't reach it
				if(this._minimum !== null && value.lessThan(this._minimum)) {
					this.validationFailures.push(
						[level.join('.'), 'not long enough']
					);
					return false;
				}

				// If there's a maximum and we surpass it
				if(this._maximum !== null && value.greaterThan(this._maximum)) {
					this.validationFailures.push([level.join('.'), 'too long']);
					return false;
				}

				// Return OK
				return true;
			}
		}

		// Else if we are validating a string value
		else if(this._type === 'string') {

			// If the value is not some form of string
			if(typeof value !== 'string') {
				this.validationFailures.push(
					[level.join('.'), 'is not a string']
				);
				return false;
			}

			// If we have a regex
			if(this._regex) {

				// If it doesn't match the regex
				if(!this._regex.test(value)) {
					this.validationFailures.push([level.join('.'), 'invalid']);
					return false;
				}
			}

			// If we have a min or max
			if(this._minimum || this._maximum) {

				// If there's a minimum length and we don't reach it
				if(this._minimum && value.length < this._minimum) {
					this.validationFailures.push(
						[level.join('.'), 'not long enough']
					);
					return false;
				}

				// If there's a maximum length and we surpass it
				if(this._maximum && value.length > this._maximum) {
					this.validationFailures.push([level.join('.'), 'too long']);
					return false;
				}

				// Return OK
				return true;
			}
		}

		// If there's a list of options
		if(this._options !== null) {

			// Returns based on the option's existance
			if(this._options.indexOf(value) === -1) {
				this.validationFailures.push(
					[level.join('.'), 'not in options']
				);
				return false;
			} else {
				return true;
			}
		}

		// Else check for basic min/max
		else {

			// If the value is less than the minimum
			if(this._minimum && value < this._minimum) {
				this.validationFailures.push(
					[level.join('.'), 'did not meet minimum']
				);
				return false;
			}

			// If the value is greater than the maximum
			if(this._maximum && value > this._maximum) {
				this.validationFailures.push(
					[level.join('.'), 'exceeds maximum']
				);
				return false;
			}
		}

		// Value has no issues
		return true;
	}
}

// Register with Base
Base.register('node', Node);