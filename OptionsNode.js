/**
 * Options Node
 *
 * Represents a node which can have several different types of values/Nodes and
 * still be valid
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
// Ouroboros modules
import { clone, merge } from '@ouroboros/tools';
// Import modules
import BaseNode from './BaseNode';
import Child from './Child';
import NodeException from './NodeException';
// Node class
export default class OptionsNode extends BaseNode {
    // List of valid nodes
    _nodes;
    /**
     * Constructor
     *
     * Initialises the instance
     *
     * @name OptionsNode
     * @access public
     * @param details Node structure
     * @param extend Extend the base node structure, if false, don't copy the
     * 					base node structure details
     * @returns a new instance
     */
    constructor(details, extend) {
        // If the details are not an Array
        if (!Array.isArray(details)) {
            throw new Error('details must be an Array');
        }
        // Init the details
        let aDetails;
        // If we have no extend at all
        if (extend === undefined) {
            // Make a copy of the details so we don't screw up the original
            //	object
            aDetails = clone(details);
        }
        // Else, if we have an extend value
        else {
            // If it's an array
            if (Array.isArray(extend)) {
                // Clone the details
                aDetails = clone(details);
                // Go through each element of the array
                let i = 0;
                for (; i < aDetails.length; ++i) {
                    // If we have the array in the extend
                    if (i < extend.length) {
                        // Merge it with the current element
                        merge(aDetails[i], extend[i]);
                    }
                }
                // Go through any additional extended nodes
                for (; i < extend.length; ++i) {
                    aDetails.push(extend[i]);
                }
            }
            // Else, if it's false
            else if (extend === false) {
                // Just use the details as is, don't copy it
                aDetails = details;
            }
            // Else, we got some sort of invalid value for extend
            else {
                throw new Error('extend must be an Array or false');
            }
        }
        // Call the parent constructor
        super({}, 'HashNode');
        // Init the internal list
        this._nodes = [];
        // Go through each element in the list
        for (let i = 0; i < details.length; ++i) {
            // Add the child
            this._nodes.push(Child.create(details[i]));
            // If the child is not optional, than the entire object can't be
            //	optional
            if (!this._nodes[i].optional()) {
                this._optional = false;
            }
        }
    }
    /**
     * Iterator
     *
     * Allows the instance to be used as an iterator
     *
     * @name [Symbol.iterator]
     * @returns Object
     */
    [Symbol.iterator]() {
        // Init the variable that has the current position
        let iPos = 0;
        const $this = this;
        return {
            next: () => {
                return iPos < $this._nodes.length ?
                    { value: $this._nodes[iPos++], done: false } :
                    { done: true };
            }
        };
    }
    /**
     * Clean
     *
     * Uses the valid method to check which type the value is, and then
     * calls the correct version of clean on that node
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
        if (value == null) {
            // If it's optional, return as is
            if (this._optional) {
                return null;
            }
            // Missing value
            throw new NodeException([[level.join('.'), 'missing']]);
        }
        // Go through each of the nodes
        for (const o of this._nodes) {
            // If it's valid
            if (o.valid(value)) {
                // Use its clean
                return o.clean(value, level);
            }
        }
        // Something went wrong
        throw new NodeException([[level.join('.'), 'matches no option']]);
    }
    /**
     * Get
     *
     * Returns the node associated with the given index
     *
     * @name get
     * @access public
     * @param index The index associated with the node to get
     * @param def If set, returned when a node is not found
     * @returns the child node associated with the index
     */
    get(index, def) {
        if (this._nodes[index] !== undefined) {
            return this._nodes[index];
        }
        else {
            if (def === undefined) {
                throw new Error(`No such node in the Options: ${index}`);
            }
            else {
                return def;
            }
        }
    }
    /**
     * Length (get)
     *
     * Returns the number of nodes in the array of options
     *
     * @name length
     * @access public
     * @returns the number of nodes available as options
     */
    get length() {
        return this._nodes.length;
    }
    /**
     * To Object
     *
     * Returns the Nodes as a list of dictionaries in the same format as is used
     * in constructing them
     *
     * @name toObject
     * @access public
     * @returns a list of the available nodes as objects that can be represented
     * 			by json
     */
    toObject() {
        // Init the Array
        const aRet = [];
        // Go through each of the nodes
        for (const o of this._nodes) {
            aRet.push(o.toObject());
        }
        // Return the Array
        return aRet;
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
        // Go through each of the nodes
        for (const o of this._nodes) {
            // If it's valid
            if (o.valid(value)) {
                return true;
            }
        }
        // Not valid for anything
        this.validationFailures.push([level.join('.'), 'no valid option']);
        return false;
    }
}
// Register with Child
Child.register('options', OptionsNode);
