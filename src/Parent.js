/**
 * Parent
 *
 * Represents defined keys mapped to other Nodes which themselves could be
 * Parents
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
// Ouroboros modules
import { clone, combine, isObject } from '@ouroboros/tools';
// Import modules
import Base from './Base';
import NodeException from './NodeException';
// Import helpers
import constants from './constants';
/**
 * Parent
 *
 * handles objects of nodes
 *
 * @name Parent
 * @access public
 * @extends Base
 */
export default class Parent extends Base {
    // Children nodes by name
    _nodes;
    // List of requirements by node
    _requires;
    /**
     * Constructor
     *
     * Initialises the instance
     *
     * @name Parent
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
        // Call the parent constructor
        super(oDetails, 'Parent');
        // Init the nodes and requires dicts
        this._nodes = {};
        this._requires = {};
        // Go through the keys in the details
        for (const k of Object.keys(oDetails)) {
            // If key is standard
            if (constants.standard.test(k)) {
                // Add the child
                this._nodes[k] = Base.create(oDetails[k]);
            }
        }
        // If there's a require hash available
        if ('__require__' in oDetails) {
            this.requires(oDetails.__require__);
        }
    }
    /**
     * Iterator
     *
     * Allows the instance to be used as an iterator
     *
     * @name [Symbol.iterator]
     * @return a key (field name) of the parent
     */
    [Symbol.iterator]() {
        // Init the variables that have the keys and current position
        let iPos = 0;
        const aKeys = Object.keys(this._nodes);
        return {
            next: () => {
                return iPos < aKeys.length ?
                    { value: aKeys[iPos++], done: false } :
                    { done: true };
            }
        };
    }
    /**
     * Clean
     *
     * Goes through each of the values in the Object, cleans it, stores it,
     * and returns a new Object
     *
     * @name clean
     * @access public
     * @param value The value to clean
     * @returns the cleaned object values
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
        // If the value is not a valid Object
        if (!isObject(value)) {
            throw new NodeException([[level.join('.'), 'not a valid Object']]);
        }
        // Go through each key
        const aErrors = [];
        const oRet = {};
        for (const k of Object.keys(value)) {
            // Add the field to the level
            const aLevel = level.slice(0);
            aLevel.push(k);
            try {
                oRet[k] = this._nodes[k].clean(value[k], aLevel);
            }
            catch (err) {
                if (err.name === 'NodeException') {
                    aErrors.push(err.errors);
                }
                else {
                    throw new NodeException([[aLevel.join('.'), 'not a valid node']]);
                }
            }
        }
        // If there's any errors
        if (aErrors.length) {
            throw new NodeException(aErrors);
        }
        // Return the cleaned values
        return oRet;
    }
    /**
     * Contains
     *
     * Returns whether a specific key exists in the parent
     *
     * @name contains
     * @access public
     * @param key The key to check the existence of
     * @return bool
     */
    contains(key) {
        return key in this._nodes;
    }
    /**
     * Get
     *
     * Returns the node associated with the given key
     *
     * @name get
     * @access public
     * @param key The key associated with the node to get
     * @param def If set, returned when a node is not found
     * @return the child node associated with the key
     */
    get(key, def) {
        if (key in this._nodes) {
            return this._nodes[key];
        }
        else {
            if (def === undefined) {
                throw new Error(`No such node in the Parent "${key}"`);
            }
            else {
                return def;
            }
        }
    }
    /**
     * Keys
     *
     * Returns a list of the node names in the parent
     *
     * @name keys
     * @access public
     * @return a list of keys (field names) in the parent
     */
    keys() {
        return Object.keys(this._nodes);
    }
    /**
     * Requires
     *
     * Sets or gets the require rules used to validate the Parent
     *
     * @name requires
     * @access public
     * @param require An Object expressing requirements of fields
     * @return The object of requirements for get, or void for set
     */
    requires(require) {
        // If require is not defined, this is a getter
        if (require === undefined) {
            return this._requires;
        }
        // If it's not a valid Object
        if (!isObject(require)) {
            throw new Error('__require__ must be a valid Object');
        }
        // Init the new requite object
        const oRequire = {};
        // Go through each key and make sure it goes with a field
        for (const k of Object.keys(require)) {
            // If the field doesn't exist
            if (!(k in this._nodes)) {
                throw new Error('__require__[' + String(k) + '] does not exist in the Parent');
            }
            // If the value is a string
            if (typeof require[k] === 'string') {
                if (!(require[k] in this._nodes)) {
                    throw new Error('__require__[' + String(k) + ']:' + String(require[k]));
                }
                oRequire[k] = [require[k]];
            }
            // Else if it's an array type
            else if (Array.isArray(require[k])) {
                for (const s in require[k]) {
                    if (!(require[k][s] in this._nodes)) {
                        throw new Error('__require__[' + String(k) + ']:' + String(require[s]));
                    }
                }
                oRequire[k] = require[k];
            }
            // Else, it's invalid data
            else {
                throw new Error('__require__[' + String(k) + '] must be a single string or an Array');
            }
        }
        // Set the new requires
        this._requires = oRequire;
    }
    /**
     * To Object
     *
     * Returns the Node as an Object in the same format as is used in
     * constructing it
     *
     * @name toObject
     * @access public
     * @returns an object that can be converted to JSON
     */
    toObject() {
        // Get the parents Object as the starting point of our return
        const oRet = super.toObject();
        // Go through each field and add it to the return
        for (const k of Object.keys(this._nodes)) {
            oRet[k] = this._nodes[k].toObject();
        }
        // Return
        return oRet;
    }
    /**
     * Valid
     *
     * Checks if the passed dict has the right values for this Parent
     *
     * @name valid
     * @param value The value to validate
     * @param level Names of parents to this node
     * @returns if the value is valid or not
     */
    valid(value, level) {
        // Reset validation failures
        this.validationFailures = [];
        // If level is not passed
        if (level === undefined) {
            level = [];
        }
        // If the value is null
        if (value === null) {
            // If it's optional, we're good
            if (this._optional) {
                return true;
            }
            // Invalid value
            this.validationFailures.push([level.join('.'), 'missing']);
            return false;
        }
        // If the value isn't an Object
        if (!isObject(value)) {
            this.validationFailures.push([level.join('.'), String(value)]);
            return false;
        }
        // Init the return, assume valid
        let bRet = true;
        // Go through each node in the instance
        for (const k of Object.keys(this._nodes)) {
            // Add the field to the level
            const aLevel = level.slice(0);
            aLevel.push(k);
            // If we are missing a node
            if (!(k in value)) {
                // If the value is not optional
                if (!this._nodes[k].optional()) {
                    this.validationFailures.push([aLevel.join('.'), 'missing']);
                    bRet = false;
                }
                // Continue to next node
                continue;
            }
            // If the element isn't valid, return false
            if (!this._nodes[k].valid(value[k], aLevel)) {
                this.validationFailures = this.validationFailures.concat(this._nodes[k].validationFailures.splice(0));
                bRet = false;
                continue;
            }
            // If the element requires others
            if (k in this._requires) {
                // Go through each required field
                for (const f of this._requires[k]) {
                    // If the field doesn't exist in the value
                    if (!(f in value) || ['0000-00-00', '0000-00-00 00:00:00', '', null].indexOf(value[f]) !== -1) {
                        this.validationFailures.push([aLevel.join('.'), 'requires "' + String(f) + '" to also be set']);
                        bRet = false;
                    }
                }
            }
        }
        // Return whatever the result was
        return bRet;
    }
}
// Register with Base
Base.register('parent', Parent);
