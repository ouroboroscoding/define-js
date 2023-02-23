/**
 * Node
 *
 * Represents a data node of a specific type, this type of node has no children
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
import Base from './Base';
import { MinMax } from './Types';
/**
 * Node
 *
 * Handles single elements of data
 *
 * @name Node
 * @access public
 * @extends Base
 */
export default class Node extends Base {
    _regex: RegExp | null;
    _minimum: any;
    _maximum: any;
    _options: any[] | null;
    _type: string;
    /**
     * Constructor
     *
     * Initialises the instance
     *
     * @name Node
     * @access public
     * @param details Node structure
     * @param extend Extend the base node structure, if false, don't copy the
     * 					base node structure details
     * @returns a new instance
     */
    constructor(details: Record<string, any> | string, extend?: Record<string, any> | false);
    /**
     * Clean
     *
     * Cleans and returns the new value
     *
     * @name clean
     * @access public
     * @param value The value to clean
     * @returns the cleaned value
     */
    clean(value?: any, level?: string[]): any;
    /**
     * Min/Max
     *
     * Sets or gets the minimum and/or maximum values for the Node. For
     * getting, returns {"minimum":mixed,"maximum":mixed}
     *
     * @name minmax
     * @access public
     * @param minimum The minimum value
     * @param maximum The maximum value
     * @return the current min / max on get, or void for set
     */
    minmax(minimum?: any, maximum?: any): MinMax | void;
    /**
     * Options
     *
     * Sets or gets the list of acceptable values for the Node
     *
     * @name options
     * @access public
     * @param array opts				An array of valid values for the node when setting
     * @return void|Array
     */
    options(opts?: any[]): any[] | null | void;
    /**
     * Regex
     *
     * Sets or gets the regular expression used to validate the Node
     *
     * @name regex
     * @access public
     * @param str|RegExp regex		A regular expression string or object
     * @return void|RegExp
     */
    regex(regex?: RegExp | string): RegExp | null | void;
    /**
     * To Object
     *
     * Returns the Node as an Object in the same format as is used in
     * constructing it
     *
     * @name toObject
     * @returns an object that can be converted to JSON
     */
    toObject(): Record<string, any>;
    /**
     * Type
     *
     * Returns the type of Node this is
     *
     * @name type
     * @return the type of node
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
     * @returns if the value is valid or not
     */
    valid(value: any | null, level?: string[]): boolean;
}
