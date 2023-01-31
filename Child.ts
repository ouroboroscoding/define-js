/**
 * Child
 *
 * Used to simplify the process of children in children in children
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */

// Ouroboros modules
import { isObject } from "@ouroboros/tools";

// Local modules
import BaseNode from "./BaseNode";

// Private variables
let _classes: Record<string, any> = {};

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
function create(details: Record<string, any>): any {

	// If it's an array, create a list of options
	if(Array.isArray(details)) {
		return new _classes.options(details);
	}

	// Else if we got an object
	else if(isObject(details)) {

		// If array is present
		if('__array__' in details) {
			return new _classes.array(details, false);
		}

		// Else if we have a hash
		else if('__hash__' in details) {
			return new _classes.hash(details, false);
		}

		// Else if we have a type
		else if('__type__' in details) {

			// If the type is an object or an array, this is a complex type
			if(isObject(details.__type__) || Array.isArray(details.__type__)) {
				return create(details.__type__);
			}

			// Else it's just a Node
			else {
				return new _classes.node(details, false);
			}
		}

		// Else it's most likely a parent
		else {
			return new _classes.parent(details, false)
		}
	}

	// Else if we got a string, use the value as the type
	else if(typeof details === 'string') {
		return new _classes.node(details, false);
	}

	// Else, raise an error
	else {
		throw new Error('details invalid');
	}
}

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
function register(name: object | string, constructor?: any): void {
	if(typeof name === 'object') {
		_classes = name;
	} else {
		_classes[name] = constructor;
	}
}

// Export module
const Child = { create, register }
export default Child;
