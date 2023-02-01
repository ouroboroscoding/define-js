/**
 * Hash Node
 *
 * Represents a node which is actually a dynamic object containing defined keys
 * (Node) and values (BaseNode)
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
import BaseNode from './BaseNode';
import Node from './Node';
/**
 * Hash Node
 *
 * Dynamic object node
 *
 * @name HashNode
 * @access public
 * @extends BaseNode
 */
export default class HashNode extends BaseNode {
    _key: Node;
    _node: BaseNode;
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
    constructor(details: Record<string, any>, extend?: Record<string, any> | false);
    /**
     * Child
     *
     * Returns the child node associated with the hash
     *
     * @name child
     * @access public
     * @returns the instance of the value node
     */
    child(): BaseNode;
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
    clean(value?: Record<any, any> | null, level?: string[]): Record<any, any> | null;
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
    toObject(): Record<string, any>;
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
    valid(value: Record<any, any> | null, level?: string[]): boolean;
}
