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
    constructor(errors: string[][]);
    /**
     * To String
     *
     * Returns the exception in a string format
     *
     * @name toString
     * @access public
     * @return string
     */
    toString(): string;
}
