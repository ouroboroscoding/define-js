/**
 * Array Node
 *
 * Represents a node which is actually an array containing lists of another node
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
import Base from './Base';
import { MinMax } from './Types';
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
    _minimum: number | null;
    _maximum: number | null;
    _type: 'unique' | 'duplicates';
    _node: Base;
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
     * @return a new instance
     */
    constructor(details: Record<string, any>, extend?: Record<string, any> | false);
    /**
     * Child
     *
     * Returns the child node associated with the array
     *
     * @name child
     * @access public
     * @return the instance of the elements node
     */
    child(): Base;
    /**
     * Clean
     *
     * Goes through each of the values in the list, cleans it, stores it,
     * and returns a new list
     *
     * @name clean
     * @access public
     * @param value The value to clean
     * @return the cleaned array values
     */
    clean(value?: any[] | null, level?: string[]): any[] | null;
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
     * @return The currently set min / max on get, or void for set
     */
    minmax(minimum?: number | string | null, maximum?: number | string | null): MinMax | void;
    /**
     * To Object
     *
     * Returns the Array as an Object in the same format as is used in
     * constructing it
     *
     * @name toObject
     * @access public
     * @return an object that can be converted to JSON
     */
    toObject(): Record<string, any>;
    /**
     * Type
     *
     * Returns the type of array, unique or duplicate
     *
     * @name type
     * @access public
     * @return string
     */
    type(): string;
    /**
     * Valid
     *
     * Checks if a value is valid based on the instance's values
     *
     * @name valid
     * @access public
     * @param value The value to validate
     * @param level Names of parents to this node
     * @return if the value is valid or not
     */
    valid(value: any[] | null, level?: string[]): boolean;
}
