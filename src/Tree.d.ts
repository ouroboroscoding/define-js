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
import Parent from './Parent';
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
    _name: string;
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
    constructor(details: Record<string, any>, extend?: Record<string, any> | false);
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
    toObject(): Record<string, any>;
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
    valid(value: Record<string, any>, level?: string[]): boolean;
}
