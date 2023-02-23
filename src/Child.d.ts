/**
 * Child
 *
 * Used to simplify the process of children in children in children
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
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
declare function create(details: Record<string, any>): any;
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
 * @param constructor The class to associated with the given name
 */
declare function register(name: object | string, constructor?: any): void;
declare const Child: {
    create: typeof create;
    register: typeof register;
};
export default Child;
