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
import BaseNode from './BaseNode';
export default class OptionsNode extends BaseNode {
    _nodes: BaseNode[];
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
    constructor(details: Record<string, any>[], extend?: Record<string, any>[] | false);
    /**
     * Iterator
     *
     * Allows the instance to be used as an iterator
     *
     * @name [Symbol.iterator]
     * @returns Object
     */
    [Symbol.iterator](): {
        next: () => {
            value: BaseNode;
            done: boolean;
        } | {
            done: boolean;
            value?: undefined;
        };
    };
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
    clean(value?: any | null, level?: string[]): Record<any, any> | null;
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
    get(index: number, def?: BaseNode): BaseNode;
    /**
     * Length (get)
     *
     * Returns the number of nodes in the array of options
     *
     * @name length
     * @access public
     * @returns the number of nodes available as options
     */
    get length(): number;
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
    toObject(): Record<string, any>[];
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
    valid(value: any | null, level?: string[]): boolean;
}
