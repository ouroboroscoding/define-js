/**
 * Helpers
 *
 * Helper functions that don't belong in any specific space
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */

// Local imports
import Decimal from './Decimal';

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
export function compareIPs(first: string, second: string): number {

	// If the two IPs are the same, return 0
	if(first === second) {
		return 0;
	}

	// Create lists from the split of each IP, store them as ints
	const aFirst: number[] = [];
	for(const s of first.split('.')) {
		aFirst.push(parseInt(s, 10));
	}
	const aSecond: number[] = [];
	for(const s of second.split('.')) {
		aSecond.push(parseInt(s, 10));
	}

	// Go through each part from left to right until we find the
	// 	difference
	for(let i = 0; i < 4; ++i) {

		// If the part of x is greater than the part of y
		if(aFirst[i] > aSecond[i]) {
			return 1;
		}

		// Else if the part of x is less than the part of y
		else if(aFirst[i] < aSecond[i]) {
			return -1;
		}
	}

	// To make typescript happy
	return 0;
}

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
export function dateToStr(date: Date): string {

	// Init the return variable
	let sRet = '';

	// Add the year
	sRet += date.getFullYear() + '-';

	// Add the month
	const iMonth = date.getMonth();
	sRet += ((iMonth < 10) ? '0' + iMonth : iMonth.toString()) + '-'

	// Add the day
	const iDay = date.getDate();
	sRet += ((iDay < 10) ? '0' + iDay : iDay.toString())

	// Return the date
	return sRet;
}

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
export function dateTimeToStr(datetime: Date): string {

	// Init the return variable with the date
	let sRet = dateToStr(datetime);

	// Add the time
	sRet +=  ' ' + datetime.toTimeString().substring(0,8);

	// Return the new date/time
	return sRet;
}

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
export function strToInt(s: string): number {

	// If it starts with 0
	if(s.charAt(0) === '0' && s.length > 1) {

		// If it's followed by X or x, it's hex
		if(['x', 'X'].indexOf(s.charAt(1)) !== -1 && s.length > 2) {
			return parseInt(s, 16)
		}

		// Else it's octal
		else {
			return parseInt(s, 8)
		}
	}

	// Else it's base 10
	else {
		return parseInt(s, 10);
	}
}

// Export the functions
const helpers = { compareIPs, dateToStr, dateTimeToStr, strToInt }
export default helpers;
