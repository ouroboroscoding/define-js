/**
 * Hash Node
 *
 * Represents a node which is actually a dynamic object containing defined keys
 * (Node) and values (Base)
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */

// Ouroboros modules
import { clone, combine, isObject } from '@ouroboros/tools';

// Import modules
import Base from './Base';
import Node from './Node';
import NodeException from './NodeException';

/**
 * Hash Node
 *
 * Dynamic object node
 *
 * @name HashNode
 * @access public
 * @extends Base
 */
export default class HashNode extends Base {

	// The key node
	_key: Node;

	// The value node
	_node: Base;

	/**
	 * Constructor
	 *
	 * Initialises the instance
	 *
	 * @name HashNode
	 * @access public
	 * @param details Node structure
	 * @param extend Extend the base node structure, if false, don't copy the
	 * 					base node structure details
	 * @returns a new instance
	 */
	constructor(details: Record<string, any>, extend?: Record<string, any> | false) {

		// If the details are not an Object
		if(!isObject(details)) {
			throw new Error('details must be an Object');
		}

		// If the hash config is not found
		if(!('__hash__' in details)) {
			throw new Error('missing "__hash__" in details');
		}

		// Init the details
		let oDetails: Record<string, any>;

		// If we have no extend at all
		if(extend === undefined) {

			// Make a copy of the details so we don't screw up the original
			//	object
			oDetails = clone(details);
		}

		// Else, if we have an extend value
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

		// Call the parent constructor
		super(oDetails, 'HashNode');

		// If the hash is simply set to true, make it a string with no
		//	requirements
		if(oDetails.__hash__ === true) {
			oDetails.__hash__ = {__type__: 'string'};
		}

		// Store the key using the hash value
		this._key = new Node(oDetails.__hash__);

		// Remove it from details
		delete oDetails.__hash__;

		// Store the child
		this._node = Base.create(oDetails);
	}

	/**
	 * Child
	 *
	 * Returns the child node associated with the hash
	 *
	 * @name child
	 * @access public
	 * @returns the instance of the value node
	 */
	child(): Base {
		return this._node;
	}

	/**
	 * Clean
	 *
	 * Makes sure both the key and value are properly stored in their
	 * correct representation
	 *
	 * @name clean
	 * @access public
	 * @param value The value to clean
	 * @returns the cleaned object values
	 */
	clean(value?: Record<any, any> | null, level?: string[]): Record<any, any> | null {

		// If level is not passed
		if(level === undefined) {
			level = [];
		}

		// If the value is null
		if(value === undefined || value === null) {

			// If it's optional, return as null
			if(this._optional) {
				return null;
			}

			// Missing value
			throw new NodeException([[level.join('.'), 'missing']]);
		}

		// If the value is not a valid Object
		if(!isObject(value)) {
			throw new NodeException([[level.join('.'), 'not a valid Object']]);
		}

		// Go through each key
		const aErrors: string[][] = [];
		const oRet: Record<string, any> = {};
		for(const k of Object.keys(value)) {

			// Add the field to the level
			const aLevel = level.slice(0);
			aLevel.push(k);

			// Try to clean the values
			try {
				oRet[this._key.clean(k)] = this._node.clean(value[k], aLevel);
			} catch(err: any) {
				if(err.name === 'NodeException') {
					aErrors.push(...err.errors);
				} else {
					throw err;
				}
			}
		}

		// If there's any errors
		if(aErrors.length) {
			throw new NodeException(aErrors);
		}

		// Return the cleaned object
		return oRet;
	};

	/**
	 * To Object
	 *
	 * Returns the basic node as a dictionary in the same format as is used
	 * in constructing it
	 *
	 * @name toObject
	 * @access public
	 * @returns an object that can be converted to JSON
	 */
	toObject(): Record<string, any> {

		// Init the object we will return
		const oRet: Record<string, any> = {};

		// Add the hash key
		oRet.__hash__ = this._key.toObject();

		// Get the parents Object and add it to the return
		const oBase = super.toObject();
		for(const k of Object.keys(oBase)) {
			oRet[k] = oBase[k];
		}

		// Get the nodes Object and also add it to the return
		const oNode = this._node.toObject();
		for(const k of Object.keys(oNode)) {
			oRet[k] = oNode[k];
		}

		// Return
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
	 * @param level Names of parents to this node
	 * @returns if the value is valid or not
	 */
	valid(value: Record<any, any> | null, level?: string[]): boolean {

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

		// If the value isn't an Object
		if(!isObject(value)) {
			this.validationFailures.push([level.join('.'), String(value)]);
			return false;
		}

		// Init the return, assume valid
		let bRet = true;

		// Go through each key
		for(const k of Object.keys(value)) {

			// Add the field to the level
			const aLevel = level.slice(0);
			aLevel.push(k);

			// If the key isn't valid
			if(!this._key.valid(String(k))) {
				this.validationFailures.push([aLevel.join('.'), 'invalid key: ' + String(k)]);
				bRet = false;
				continue;
			}

			// Check the value
			if(!this._node.valid(value[k], aLevel)) {
				this.validationFailures = this.validationFailures.concat(this._node.validationFailures.splice(0));
				bRet = false;
				continue;
			}
		}

		// Return whatever the result was
		return bRet;
	}
}

// Register with Base
Base.register('hash', HashNode);