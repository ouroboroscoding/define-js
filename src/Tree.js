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
import { clone, combine, isObject, opop } from '@ouroboros/tools';
// Import modules
import Parent from './Parent';
// Import helpers
import constants from './constants';
/**
 * Tree
 *
 * Represents a named Parent
 *
 * @name Tree
 * @access public
 * @extends Parent
 */
export default class Tree extends Parent {
    // The name of the tree
    _name;
    /**
     * Constructor
     *
     * Initialises the instance
     *
     * @name Tree
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
        // If the name is not set
        if (!('__name__' in details)) {
            throw new Error('"__name__" not found in details');
        }
        // If the name is not valid
        if (!constants.standard.test(details.__name__)) {
            throw new Error('"__name__" not a valid value for Tree');
        }
        // If for some reason the array flag is set, remove it
        if ('__array__' in oDetails) {
            delete oDetails.__array__;
        }
        // Call the parent constructor
        super(oDetails, false);
        // Store the name then delete it
        this._name = opop(oDetails, '__name__');
        // Overwrite classname
        this._class = 'Tree';
    }
    /**
     * To Object
     *
     * Returns the Node as a dictionary in the same format as is used in
     * constructing it
     *
     * @name toObject
     * @access public
     * @returns an object that can be converted to JSON
     */
    toObject() {
        // Init the Object we will return
        const oRet = { __name__: this._name };
        // Get the parents dict and add it to the return
        const oParent = super.toObject();
        for (const k of Object.keys(oParent)) {
            oRet[k] = oParent[k];
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
        // If level wasn't passed
        if (level === undefined) {
            level = [this._name];
        }
        // Call the Parent valid method
        return super.valid(value, level);
    }
}
