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
import BaseDecimal from 'decimal.js';
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
    points: number | null;
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
    constructor(v: BaseDecimal.Value | string);
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
    static _fromDecimalJS(v: BaseDecimal.Value | string, p: number | null): Decimal;
    /**
     * Absolute
     *
     * Returns the decimal as an absolute value
     *
     * @name abs
     * @access public
     * @returns a new Decimal
     */
    abs(): Decimal;
    /**
     * Absolute Value
     *
     * Returns the decimal as an absolute value
     *
     * @name absoluteValue
     * @access public
     * @returns a new Decimal
     */
    absoluteValue(): Decimal;
    /**
     * Ceiling
     *
     * Round fractions up
     *
     * @name ceil
     * @access public
     * @returns a new Decimal
     */
    ceil(): Decimal;
    /**
     * Decimal Places
     *
     * Returns the current number of decimal points in the number
     *
     * @name decimalPlaces
     * @access public
     * @returns The number of decimal points in the value
     */
    decimalPlaces(): number;
    /**
     * Floor
     *
     * Round fractions down
     *
     * @name floor
     * @access public
     * @returns a new Decimal
     */
    floor(): Decimal;
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
    minus(x: BaseDecimal.Value): Decimal;
    /**
     * Negated
     *
     * Returns the decimal as a negative value
     *
     * @name negated
     * @access public
     * @returns a new Decimal
     */
    negated(): Decimal;
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
    plus(x: BaseDecimal.Value): Decimal;
    /**
     * Round
     *
     * Rounds to the closest whole number
     *
     * @name round
     * @access public
     * @returns a new Decimal
     */
    round(): Decimal;
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
    times(x: BaseDecimal.Value): Decimal;
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
    toDecimalPlaces(dp: number, rm?: BaseDecimal.Rounding): Decimal;
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
    toFixed(p: number): string;
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
    toNearest(x: BaseDecimal.Value): Decimal;
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
    toSignificantDigits(sd: number, rm?: BaseDecimal.Rounding): Decimal;
    /**
     * To String
     *
     * Returns the decimal as a string representation
     *
     * @name toString
     * @access public
     * @returns string
     */
    toString(): string;
    /**
     * Truncated
     *
     * Truncates the instance to a whole number
     *
     * @name truncated
     * @access public
     * @returns a new Decimal
     */
    truncated(): Decimal;
}
