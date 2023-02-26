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
import Base from './Base';
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
    _nodes: Record<string, Base>;
    _requires: Record<string, string[]>;
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
    constructor(details: Record<string, any>, extend?: Record<string, any> | false);
    /**
     * Iterator
     *
     * Allows the instance to be used as an iterator
     *
     * @name [Symbol.iterator]
     * @return a key (field name) of the parent
     */
    [Symbol.iterator](): {
        next: () => {
            value: string;
            done: boolean;
        } | {
            done: boolean;
            value?: undefined;
        };
    };
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
    clean(value?: Record<any, any> | null, level?: string[]): Record<any, any> | null;
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
    contains(key: string): boolean;
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
    get(key: string, def?: Base): Base;
    /**
     * Keys
     *
     * Returns a list of the node names in the parent
     *
     * @name keys
     * @access public
     * @return a list of keys (field names) in the parent
     */
    keys(): string[];
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
    requires(require?: Record<string, string | string[]>): Record<string, string[]> | void;
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
    valid(value: Record<string, any> | null, level?: string[]): boolean;
}
