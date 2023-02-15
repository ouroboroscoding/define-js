/**
 * Base Node
 *
 * This is the base class for most nodes, deals with the optional flag and
 * special variables
 *
 * @author Chris Nasr
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */

// Ouroboros modules
import { clone, isObject } from '@ouroboros/tools';

// Import modules
import types from './types';

/**
 * Base Node
 *
 * The base class for most Node types
 *
 * @name BaseNode
 * @access public
 */
export default class BaseNode {

	// The name of the class of node
	_class: string;

	// Flag to indicate whether the node is optional
	_optional: boolean;

	// Store of special data
	_special: Record<string, any>;

	// Validation failures list
	validationFailures: string[][];

	/**
	 * Constructor
	 *
	 * Initialises the instance
	 *
	 * @name BaseNode
	 * @access public
	 * @param details Node structure
	 * @param className The type of Node
	 * @returns BaseNode
	 */
	constructor(details: Record<string, any>, className: string) {

		// If the details are not an Object
		if(!isObject(details)) {
			throw new Error('details must be an Object');
		}

		// Init the variables used to identify the last falure in validation
		this.validationFailures = [];

		// Store the type
		this._class = className;

		// Is the node optional?
		this._optional = false;

		// If the details contains an optional flag
		if('__optional__' in details) {

			// If it's a valid bool, store it
			if(typeof details.__optional__ === 'boolean') {
				this._optional = details.__optional__;
			}

			// Else, write a warning to the console
			else {
				throw new Error('"' + String(details.__optional__) + '" is not a valid value for __optional__.');
			}

			// Remove it from details
			delete details.__optional__;
		}

		// Any special fields associated with the node
		this._special = {};

		// Go through the keys in details
		for(const k in details) {

			// If the key is used by the child
			if(types.special.reserved.indexOf(k) !== -1) {
				continue;
			}

			// If the current key is special
			const lMatch = types.special.key.exec(k);
			if(lMatch) {

				// Store it with the other specials then remove it
				this._special[lMatch[1]] = details[k];
				delete details[k];
			}
		}
	}

	/**
	 * Class
	 *
	 * Returns a string representation of the Node's class
	 *
	 * @name class
	 * @access public
	 * @returnsstring
	 */
	class(): string {
		return this._class;
	}

	/**
	 * Clean
	 *
	 * Cleans a node based on the type and returns the cleaned version
	 *
	 * @name clean
	 * @access public
	 * @param value The value to clean
	 * @returns the cleaned value
	 */
	clean(value?: any, level?: string[]): any {
		throw new Error('Must extend "clean" to extend "BaseNode"');
	}

	/**
	 * Optional
	 *
	 * Getter/Setter for the optional flag
	 *
	 * @name optional
	 * @param value The value to set
	 * @returnsbool | void
	 */
	optional(value?: boolean): boolean | void {

		// If the value is not set, this is a getter
		if(value === undefined) {
			return this._optional;
		}

		// Else, set it
		else {
			this._optional = (value ? true : false)
		}
	}

	/**
	 * Special
	 *
	 * Getter/Setter method for special values associated with nodes that are
	 * not fields. To retrieve a value or values, pass only the name or names,
	 * to set a single special value, pass a name and value
	 *
	 * @name special
	 * @access public
	 * @param name The name of the value to either set or get
	 * @param value The value to set, must be something that can be
	 * 				converted directly to JSON
	 * @returnsmixed|void
	 */
	special(name: string, value?: any) {

		// Check the name is a string
		if(typeof name === 'string') {
			throw new Error('name must be a string');
		}

		// Check the name is valid
		if(!types.special.name.test(name)) {
			throw new Error('special name must match "' + types.special.syntax + '"');
		}

		// If the value is not set, this is a getter
		if(value === undefined) {

			// Return the value or null
			return (name in this._special) ? clone(this._special[name]) : null;
		}

		// Else, this is a setter
		else {

			// Make sure it can be converted to JSON
			try {
				JSON.stringify(value);
				this._special[name] = value;
			}
			catch(err) {
				throw new Error('__' + name + '__ value can not be encoded to JSON');
			}
		}
	}

	/**
	 * To JSON
	 *
	 * Returns a JSON string representation of the instance
	 *
	 * @name toJSON
	 * @access public
	 * @returns json reprentation of the node
	 */
	toJSON(): string {
		return JSON.stringify(this.toObject());
	}

	/**
	 * To Object
	 *
	 * Returns the basic node as an Object in the same format as is used in
	 * constructing it
	 *
	 * @name toObject
	 * @access public
	 * @returns the node as an object that can be represented by json
	 */
	toObject(): Record<string, any> {

		// Init the object we will return
		const oRet: Record<string, any> = {};

		// If the optional flag is set
		if(this._optional) {
			oRet.__optional__ = true;
		}

		// Add all the special fields found
		for(const k of Object.keys(this._special)) {
			oRet['__' + k + '__'] = this._special[k];
		}

		// Return the Object
		return oRet;
	}

	/**
	 * Valid
	 *
	 * Checks if a value is valid based on the instance's values
	 *
	 * @name valid
	 * @access public
	 * @param value The value to validate
	 * @returns if the value is valid or not
	 */
	valid(value?: any, level?: string[]): any {
		throw new Error('Must extend "valid" to extend "BaseNode"');
	}

}
