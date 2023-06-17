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
 * @name Base
 * @access public
 */
export default class Base {
    _class: string;
    _optional: boolean;
    _special: Record<string, any>;
    validationFailures: string[][];
    /**
     * Create
     *
     * Figure out the child node type necessary and create an instance of it
     *
     * @name create
     * @access public
     * @static
     * @param details An object describing a data point
     * @returns any
     */
    static create(details: Record<string, any>): any;
    /**
     * Register
     *
     * Registers the classes that can be children because we can't require them
     * in this file as webpack can't handle file A that requires file B that
     * requires file A
     *
     * @name register
     * @access public
     * @static
     * @param name Name / value object of all classes to register, or the name of
     * 				the constructor that will be added
     * @param constructor The class to associate with the given name
     */
    static register(name: object | string, constructor?: any): void;
    /**
     * Constructor
     *
     * Initialises the instance
     *
     * @name Base
     * @access public
     * @param details Node structure
     * @param className The type of Node
     * @returns Base
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
