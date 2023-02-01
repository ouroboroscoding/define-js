/**
 * Base Node
 *
 * This is the base class for most nodes, deals with the optional flag and
 * special variables
 *
 * @author Chris Nasr
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
/**
 * Base Node
 *
 * The base class for most Node types
 *
 * @name BaseNode
 * @access public
 */
export default class BaseNode {
    _class: string;
    _optional: boolean;
    _special: Record<string, any>;
    validationFailures: string[][];
    /**
     * Constructor
     *
     * Initialises the instance
     *
     * @name BaseNode
     * @access public
     * @param details Node structure
     * @param className The type of Node
     * @returns BaseNode
     */
    constructor(details: Record<string, any>, className: string);
    /**
     * Class
     *
     * Returns a string representation of the Node's class
     *
     * @name class
     * @access public
     * @returnsstring
     */
    class(): string;
    /**
     * Clean
     *
     * Cleans a node based on the type and returns the cleaned version
     *
     * @name clean
     * @access public
     * @param value The value to clean
     * @returns the cleaned value
     */
    clean(value?: any, level?: string[]): any;
    /**
     * Optional
     *
     * Getter/Setter for the optional flag
     *
     * @name optional
     * @param value The value to set
     * @returnsbool | void
     */
    optional(value?: boolean): boolean | void;
    /**
     * Special
     *
     * Getter/Setter method for special values associated with nodes that are
     * not fields. To retrieve a value or values, pass only the name or names,
     * to set a single special value, pass a name and value
     *
     * @name special
     * @access public
     * @param name The name of the value to either set or get
     * @param value The value to set, must be something that can be
     * 				converted directly to JSON
     * @returnsmixed|void
     */
    special(name: string, value?: any): any;
    /**
     * To JSON
     *
     * Returns a JSON string representation of the instance
     *
     * @name toJSON
     * @access public
     * @returns json reprentation of the node
     */
    toJSON(): string;
    /**
     * To Object
     *
     * Returns the basic node as an Object in the same format as is used in
     * constructing it
     *
     * @name toObject
     * @access public
     * @returns the node as an object that can be represented by json
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
     * @returns if the value is valid or not
     */
    valid(value?: any, level?: string[]): any;
}
