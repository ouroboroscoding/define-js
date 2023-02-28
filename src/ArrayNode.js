/**
 * Array Node
 *
 * Represents a node which is actually an array containing lists of another node
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
// Ouroboros modules
import clone from '@ouroboros/clone';
import { combine, isInteger, isObject } from '@ouroboros/tools';
// Import node modules
import Base from './Base';
// Import exceptions
import NodeException from './NodeException';
// Import helpers
import constants from './constants.js';
import { strToInt } from './helpers';
/**
 * Array Node
 *
 * Handles lists of nodes
 *
 * @name ArrayNode
 * @access public
 * @extends Base
 */
export default class ArrayNode extends Base {
    // The minimum amount of values required
    _minimum;
    // The maximum amount of values allowed
    _maximum;
    // The type of array, all unique values or not
    _type;
    // The node type of the array elements
    _node;
    /**
     * Constructor
     *
     * Initialises the instance
     *
     * @name ArrayNode
     * @access public
     * @param details Node structure
     * @param extend Extend the base node structure, if false, don't copy the
     * 					base node structure details
     * @returns a new instance
     */
    constructor(details, extend) {
        // If the details are not an Object
        if (!isObject(details)) {
            throw new Error('details must be an Object');
        }
        // If the array config is not found
        if (!('__array__' in details)) {
            throw new Error('missing "__array__" in details');
        }
        // Init the details
        let oDetails;
        // If we have no extend at all
        if (extend === undefined) {
            // Make a copy of the details so we don't screw up the original
            //	object
            oDetails = clone(details);
        }
        // Else, if we have an extend value
        else {
            // If it's an object
            if (isObject(extend)) {
                // Store the details by making a new object from the details and
                //	the extend
                oDetails = combine(details, extend);
            }
            // Else, if it's false
            else if (extend === false) {
                // Just use the details as is, don't copy it
                oDetails = details;
            }
            // Else, we got some sort of invalid value for extend
            else {
                throw new Error('extend must be an Object or false');
            }
        }
        // If the value is not an Object
        if (!isObject(oDetails.__array__)) {
            oDetails.__array__ = { type: oDetails.__array__ };
        }
        // Call parent constructor
        super(oDetails, 'ArrayNode');
        // Init the protected vars
        this._minimum = null;
        this._maximum = null;
        // If the type is invalid
        if (constants.array.indexOf(oDetails.__array__.type) === -1) {
            throw new Error('"' + String(oDetails.__array__.type) + '" is not a valid type for __array__');
        }
        // Else, store it
        else {
            this._type = oDetails.__array__.type;
        }
        // If there's a minimum or maximum present
        if ('minimum' in oDetails.__array__ || 'maximum' in oDetails.__array__) {
            this.minmax(('minimum' in oDetails.__array__ && oDetails.__array__.minimum || null), ('maximum' in oDetails.__array__ && oDetails.__array__.maximum || null));
        }
        // Remove it from oDetails
        delete oDetails.__array__;
        // Store the child
        this._node = Base.create(oDetails);
    }
    /**
     * Child
     *
     * Returns the child node associated with the array
     *
     * @name child
     * @access public
     * @returns the instance of the elements node
     */
    child() {
        return this._node;
    }
    /**
     * Clean
     *
     * Goes through each of the values in the list, cleans it, stores it,
     * and returns a new list
     *
     * @name clean
     * @access public
     * @param value The value to clean
     * @returns the cleaned array values
     */
    clean(value, level) {
        // If level is not passed
        if (level === undefined) {
            level = [];
        }
        // If the value is null
        if (value === undefined || value === null) {
            // If it's optional, return as null
            if (this._optional) {
                return null;
            }
            // Missing value
            throw new NodeException([[level.join('.'), 'missing']]);
        }
        // If the value is not an Array
        if (!Array.isArray(value)) {
            throw new NodeException([[level.join('.'), 'not a valid Array']]);
        }
        // Go through each element
        const aErrors = [];
        const aRet = [];
        for (let i = 0; i < value.length; ++i) {
            // Add the field to the level
            const aLevel = level.slice(0);
            aLevel.push('[' + i + ']');
            try {
                aRet.push(this._node.clean(value[i], aLevel));
            }
            catch (err) {
                if (err.name === 'NodeException') {
                    aErrors.push(...err.errors);
                }
                else {
                    throw err;
                }
            }
        }
        // If there's any errors
        if (aErrors.length) {
            throw new NodeException(aErrors);
        }
        // Return the cleaned array
        return aRet;
    }
    /**
     * Min/Max
     *
     * Sets or gets the minimum and/or maximum number of items for the
     * Array. For getting, returns {"minimum":uint,"maximum":uint}
     *
     * @name minmax
     * @access public
     * @param minimum The minimum value
     * @param maximum The maximum value
     * @returns The currently set min / max on get, or void for set
     */
    minmax(minimum, maximum) {
        // If neither minimum or max is set, this is a getter
        if (minimum === undefined && maximum === undefined) {
            return {
                minimum: this._minimum,
                maximum: this._maximum
            };
        }
        // If the minimum is set
        if (minimum !== null) {
            // If it's undefined
            if (minimum === undefined) {
                throw new Error('"minimum" can only be undefined if "maximum" is also undefined');
            }
            // If it's a string
            if (typeof minimum === 'string') {
                // If it's not a valid string
                if (!constants.regex.int.test(minimum)) {
                    throw new Error('"minimum" of array must be an integer');
                }
                // Else, convert it to a number
                minimum = strToInt(minimum);
            }
            // Else, if it's not a valid integer number
            else if (!isInteger(minimum)) {
                throw new Error('"minimum" of array must be an integer');
            }
            // If it's below zero
            if (minimum < 0) {
                throw new Error('"minimum" of array must be an unsigned integer');
            }
            // Store the minimum
            this._minimum = minimum;
        }
        // If maximum is set
        if (maximum !== null) {
            // If it's undefined
            if (maximum === undefined) {
                throw new Error('"maximum" can only be undefined if "minimum" is also undefined');
            }
            // If it's a string
            if (typeof maximum === 'string') {
                // If it's not a valid string
                if (!constants.regex.int.test(maximum)) {
                    throw new Error('"maximum" of array must be an integer');
                }
                // Else, convert it to a number
                maximum = strToInt(maximum);
            }
            // Else, if it's not a valid integer number
            else if (!isInteger(maximum)) {
                throw new Error('"maximum" of array must be an integer');
            }
            // If it's below zero
            if (maximum < 0) {
                throw new Error('"maximum" of array must be an unsigned integer');
            }
            // If we also have a minimum and the maximum is somehow below it
            if (this._minimum && maximum < this._minimum) {
                throw new Error('"maximum" of array must not be less than "minimum"');
            }
            // Store the maximum
            this._maximum = maximum;
        }
    }
    /**
     * To Object
     *
     * Returns the Array as an Object in the same format as is used in
     * constructing it
     *
     * @name toObject
     * @access public
     * @returns an object that can be converted to JSON
     */
    toObject() {
        // Init the object we will return
        const oRet = {};
        // If either a min or a max is set
        if (this._minimum || this._maximum) {
            // Set the array element as it's own Object
            oRet.__array__ = {
                type: this._type
            };
            // If there is a minimum
            if (this._minimum) {
                oRet.__array__.minimum = this._minimum;
            }
            // If there is a maximum
            if (this._maximum) {
                oRet.__array__.maximum = this._maximum;
            }
        }
        // Else, just add the type as the array element
        else {
            oRet.__array__ = this._type;
        }
        // Get the parents Object and add it to the return
        const oBasic = super.toObject();
        for (const k of Object.keys(oBasic)) {
            oRet[k] = oBasic[k];
        }
        // Get the nodes Object and also add it to the return
        const oNode = this._node.toObject();
        for (const k of Object.keys(oNode)) {
            oRet[k] = oNode[k];
        }
        // Return
        return oRet;
    }
    /**
     * Type
     *
     * Returns the type of array, unique or duplicate
     *
     * @name type
     * @access public
     * @returns string
     */
    type() {
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
     * @returns if the value is valid or not
     */
    valid(value, level) {
        // If level is not passed
        if (level === undefined) {
            level = [];
        }
        // Reset validation failures
        this.validationFailures = [];
        // If the value is null
        if (value == null) {
            // If it's optional, we're good
            if (this._optional) {
                return true;
            }
            // Invalid value
            this.validationFailures.push([level.join('.'), 'missing']);
            return false;
        }
        // If the value isn't an array
        if (!Array.isArray(value)) {
            this.validationFailures.push([level.join('.'), String(value)]);
            return false;
        }
        // Init the return, assume valid
        let bRet = true;
        // Keep track of duplicates
        const aItems = [];
        // Go through each item in the list
        for (let i = 0; i < value.length; ++i) {
            // Add the field to the level
            const aLevel = level.slice(0);
            aLevel.push('[' + i + ']');
            // If the element isn't valid, return false
            if (!this._node.valid(value[i], aLevel)) {
                this.validationFailures = this.validationFailures.concat(this._node.validationFailures.splice(0));
                bRet = false;
                continue;
            }
            // If we need to check for duplicates
            if (this._type === 'unique') {
                // Look for the value in the existing list
                const iIndex = aItems.indexOf(value[i]);
                // If it's found, we have a duplicate
                if (iIndex > -1) {
                    // Add the error to the list
                    this.validationFailures.push([aLevel.join('.'), 'duplicate of ' + level.join('.') + '[' + iIndex + ']']);
                    bRet = false;
                    continue;
                }
                // Else, we can add the value
                aItems.push(value[i]);
            }
        }
        // If there's a minumum
        if (this._minimum !== null) {
            // If we don't have enough
            if (value.length < this._minimum) {
                this.validationFailures.push([level.join('.'), 'did not meet minimum']);
                bRet = false;
            }
        }
        // If there's a maximum
        if (this._maximum !== null) {
            // If we have too many
            if (value.length > this._maximum) {
                this.validationFailures.push([level.join('.'), 'exceeds maximum']);
                bRet = false;
            }
        }
        // Return ok
        return bRet;
    }
}
// Register with Base
Base.register('array', ArrayNode);
