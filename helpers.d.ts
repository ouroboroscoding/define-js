/**
 * Helpers
 *
 * Helper functions that don't belong in any specific space
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
/**
 * Compare IPs
 *
 * Compares two IPs and returns a status based on which is greater
 * If first is less than second: -1
 * If first is equal to second: 0
 * If first is greater than second: 1
 *
 * @name compareIPs
 * @access public
 * @param first A string representing an IP address
 * @param second A string representing an IP address
 * @returns -1 | 0 | 1
 */
export declare function compareIPs(first: string, second: string): number;
/**
 * Date to String
 *
 * Turns a Date Object into a date string
 *
 * @name dateToStr
 * @access public
 * @param date The value to turn into a string
 * @returns the date as a string
 */
export declare function dateToStr(date: Date): string;
/**
 * Date/Time to String
 *
 * Turns a Date Object into a date and time string
 *
 * @name dateTimeToStr
 * @access public
 * @param datetime The value to turn into a string
 * @returns the date/time as a string
 */
export declare function dateTimeToStr(datetime: Date): string;
/**
 * String To Integer
 *
 * Converts a string to an int in hex, octal, or base10
 *
 * @name strToInt
 * @access public
 * @param s The value to parse to an int
 * @returns the numerical representation of the string
 */
export declare function strToInt(s: string): number;
declare const helpers: {
    compareIPs: typeof compareIPs;
    dateToStr: typeof dateToStr;
    dateTimeToStr: typeof dateTimeToStr;
    strToInt: typeof strToInt;
};
export default helpers;
