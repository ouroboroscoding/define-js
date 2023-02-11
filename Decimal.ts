/**
 * Decimal
 *
 * Pretends to be the decimal.js Decimal object to keep track of the original
 * number of decimal points at construction. Thus allowing toString as well
 * as any operations to output in the same fashion as Python's Decimal class.
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-03
 */

// Import modules
import BaseDecimal from 'decimal.js';

// Import helpers
import types from './types';

/**
 * Decimal
 *
 * Uses decimal.js BaseDecimal internally but keeps track of the length of
 * decimal points so they are never extended or truncated
 *
 * @name Decimal
 * @access public
 */
export default class Decimal {

	// Points
	points: number | null;

	// Decimal value
	value: BaseDecimal;

	/**
	 * Constructor
	 *
	 * Initialises the instance
	 *
	 * @name Decimal
	 * @access public
	 * @param val A value to convert to a decimal
	 * @returns a new Decimal
	 */
	constructor(v: BaseDecimal.Value | string) {

		// Call the parent constructor
		this.value = new BaseDecimal(v);

		// Assume no points
		this.points = null;

		// If the original value is a string
		if(typeof v === 'string') {

			// Attempt to get the fraction
			const a = types.regex.decimal.exec(v);

			// If it exists, get the length of the string
			if(a && a[1]) {
				this.points = a[1].length;
			}
		}
	}

	/**
	 * From decimal.js
	 *
	 * Convert a decimal.js value into our class
	 *
	 * @name _fromDecimalJS
	 * @access public
	 * @static
	 * @param The base class instance
	 * @param p Optional points
	 * @returns a new Decimal
	 */
	static _fromDecimalJS(v: BaseDecimal.Value | string, p: number | null): Decimal {

		// Generate a new instance
		const d = new Decimal(v);

		// Copy over the points length
		d.points = p;

		// Return the instance
		return d;
	}

	/**
	 * Absolute
	 *
	 * Returns the decimal as an absolute value
	 *
	 * @name abs
	 * @access public
	 * @returns a new Decimal
	 */
	abs(): Decimal {

		// Call the parent method and convert it
		return Decimal._fromDecimalJS(
			this.value.abs(),
			this.points
		);
	}

	/**
	 * Absolute Value
	 *
	 * Returns the decimal as an absolute value
	 *
	 * @name absoluteValue
	 * @access public
	 * @returns a new Decimal
	 */
	absoluteValue() {

		// Call the parent method and convert it
		return Decimal._fromDecimalJS(
			this.value.absoluteValue(),
			this.points
		);
	}

	/**
	 * Ceiling
	 *
	 * Round fractions up
	 *
	 * @name ceil
	 * @access public
	 * @returns a new Decimal
	 */
	ceil() {

		// Call the parent method and convert it
		return Decimal._fromDecimalJS(
			this.value.ceil(),
			this.points
		);
	}

	/**
	 * Decimal Places
	 *
	 * Returns the current number of decimal points in the number
	 *
	 * @name decimalPlaces
	 * @access public
	 * @returns The number of decimal points in the value
	 */
	decimalPlaces(): number {
		return this.value.decimalPlaces();
	}

	/**
	 * Floor
	 *
	 * Round fractions down
	 *
	 * @name floor
	 * @access public
	 * @returns a new Decimal
	 */
	floor() {

		// Call the parent method and convert it
		return Decimal._fromDecimalJS(
			this.value.floor(),
			this.points
		);
	}

	/**
	 * Minus
	 *
	 * Substracts two decimals
	 *
	 * @name minus
	 * @access public
	 * @param x The value to subtract from the current instance
	 * @returns a new Decimal
	 */
	minus(x: BaseDecimal.Value): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			this.value.minus(x),
			this.points
		);
	}

	/**
	 * Negated
	 *
	 * Returns the decimal as a negative value
	 *
	 * @name negated
	 * @access public
	 * @returns a new Decimal
	 */
	negated(): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			this.value.negated(),
			this.points
		);
	}

	/**
	 * Plus
	 *
	 * Adds two decimals
	 *
	 * @name plus
	 * @access public
	 * @param x The value to add to the current instance
	 * @returns a new Decimal
	 */
	plus(x: BaseDecimal.Value): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			this.value.plus(x),
			this.points
		);
	}

	/**
	 * Round
	 *
	 * Rounds to the closest whole number
	 *
	 * @name round
	 * @access public
	 * @returns a new Decimal
	 */
	round(): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			this.value.round(),
			this.points
		);
	}

	/**
	 * Times
	 *
	 * Multiplies two decimals
	 *
	 * @name times
	 * @access public
	 * @param x The value to multiply the current instance by
	 * @returns a new Decimal
	 */
	times(x: BaseDecimal.Value): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			this.value.times(x),
			this.points
		);
	}

	/**
	 * To Decimal Places
	 *
	 * Rounds to the given decimal place
	 *
	 * @name toDecimalPlaces
	 * @access public
	 * @param dp Decimal places
	 * @param rm Rounding mode
	 * @returns a new Decimal
	 */
	toDecimalPlaces(dp: number, rm?: BaseDecimal.Rounding): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			rm === undefined ?
				this.value.toDecimalPlaces(dp) :
				this.value.toDecimalPlaces(dp, rm),
			this.points
		);
	}

	/**
	 * To Fixed
	 *
	 * Returns a decimal with a fixed number of decimal points
	 *
	 * @name toFixed
	 * @access public
	 * @param p The number of decimal points
	 * @returns a string
	 */
	toFixed(p: number): string {
		return this.value.toFixed(p);
	}

	/**
	 * To Nearest
	 *
	 * Rounds to the nearest multiple of x
	 *
	 * @name toNearest
	 * @access public
	 * @param x Value to check multiples of
	 * @returns a new Decimal
	 */
	toNearest(x: BaseDecimal.Value): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			this.value.toNearest(x),
			this.points
		);
	}

	/**
	 * To Nearest
	 *
	 * Rounds to the nearest multiple of x
	 *
	 * @name toSignificantDigits
	 * @access public
	 * @param sd Significant digits
	 * @param rm Rounding mode
	 * @returns a new Decimal
	 */
	toSignificantDigits(sd: number, rm?: BaseDecimal.Rounding): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			rm === undefined ?
				this.value.toSignificantDigits(sd) :
				this.value.toSignificantDigits(sd, rm),
			this.points
		);
	}

	/**
	 * To String
	 *
	 * Returns the decimal as a string representation
	 *
	 * @name toString
	 * @access public
	 * @returns string
	 */
	toString(): string {

		// Call the parent
		let s = this.value.toString();

		// If we have decimal points
		if(this.points !== null) {

			// Get the current number from the return
			const a = types.regex.decimal.exec(s);

			// If it exists
			if(a) {

				// Start with the same length
				let len = this.points;

				// If we have a decimal point
				if(a[1]) {

					// If it's longer or equal to the the original
					if(a[1].length >= this.points) {
						return s;
					}

					// Get the difference
					len = this.points - a[1].length;
				}

				// Else, add the '.'
				else {
					s += '.';
				}

				// Add as many zeros and necessary
				for(let i = 0; i < len; ++i) {
					s += '0';
				}
			}
		}

		// Return the string
		return s;
	}

	/**
	 * Truncated
	 *
	 * Truncates the instance to a whole number
	 *
	 * @name truncated
	 * @access public
	 * @returns a new Decimal
	 */
	truncated(): Decimal {

		// Call the parent constructor and convert it
		return Decimal._fromDecimalJS(
			this.value.truncated(),
			this.points
		);
	}
}
