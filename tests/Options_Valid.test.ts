import { describe, expect, test } from '@jest/globals';
import { OptionsNode } from '../';

describe('Options Valid', () => {

	// Create the Options instance
	const oOption = new OptionsNode([
		{__type__: 'uint'},
		{__type__: 'string', '__options__': ['hello', 'there']}
	]);

	// Test for true
	test('0 equals 0', () => {
		expect(oOption.valid(0)).toBe(true);
	});
	test('"0" equals 0', () => {
		expect(oOption.valid('0')).toBe(true);
	});
	test('1 equals 1', () => {
		expect(oOption.valid(1)).toBe(true);
	});
	test('"1" equals 1', () => {
		expect(oOption.valid('1')).toBe(true);
	});
	test('"hello" equals "hello"', () => {
		expect(oOption.valid('hello')).toBe(true);
	});
	test('"hello" equals "there"', () => {
		expect(oOption.valid('there')).toBe(true);
	});

	// Test for false
	test('-1 is not a valid option', () => {
		expect(oOption.valid(-1)).toBe(false);
	});
	test('"-1" is not a valid option', () => {
		expect(oOption.valid('-1')).toBe(false);
	});
	test('"something" is not a valid option', () => {
		expect(oOption.valid('something')).toBe(false);
	});
	test('"else" is not a valid option', () => {
		expect(oOption.valid('else')).toBe(false);
	});
});