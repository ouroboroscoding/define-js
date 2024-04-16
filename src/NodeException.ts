/**
 * Node Exception
 *
 * Represents invalid data issues
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-07-24
 */

/**
 * Node Exception
 *
 * Throwable class for invalid node data
 *
 * @name NodeException
 * @access public
 */
export default class NodeException extends Error {

	// List of errors
	errors: string[][];

	/**
	 * Constructor
	 *
	 * Initialiased the error
	 *
	 * @name NodeException
	 * @access public
	 * @param errors The list of errors found
	 * @param message The error message
	 * @return NodeException
	 */
	constructor(errors: string[][]) {

		// Call the parent constructor
		super(String(errors));

		// Store the errors
		this.errors = errors;

		// Add the stack
		this.stack = (new Error()).stack;

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, NodeException.prototype);
	}

	/**
	 * To String
	 *
	 * Returns the exception in a string format
	 *
	 * @name toString
	 * @access public
	 * @return string
	 */
	toString(): string {
		return 'NodeException: invalid node data\n' + JSON.stringify(this.errors);
	}
}
