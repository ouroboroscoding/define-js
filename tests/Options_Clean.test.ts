import { describe, expect, test } from '@jest/globals';
import { Options } from '../src/';

describe('Options Clean', () => {

	// Create the Options instance
	const oOption = new Options([
		{__type__: 'uint'},
		{__type__: 'string', '__options__': ['hello', 'there']}
	]);

	// Check for true
	test('0 equals 0', () => {
		expect(oOption.clean(0)).toBe(0);
	});
	test('"0" equals 0', () => {
		expect(oOption.clean('0')).toBe(0);
	});
	test('1 equals 1', () => {
		expect(oOption.clean(1)).toBe(1);
	});
	test('"1" equals 1', () => {
		expect(oOption.clean('1')).toBe(1);
	});
	test('"hello" equals "hello"', () => {
		expect(oOption.clean('hello')).toBe('hello');
	});
	test('"there" equals "there"', () => {
		expect(oOption.clean('there')).toBe('there');
	});
});