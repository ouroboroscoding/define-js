import { describe, expect, test } from '@jest/globals';
import { Options } from '../src/';

describe('Options Iterate', () => {

	// Create a list of JSON representations of the options
	let l = [
		'{"__type__":"uint"}',
		'{"__type__":"string","__options__":["hello","there"]}'
	]

	// Create the Options instance
	const oOption = new Options([
		{__type__: 'uint'},
		{__type__: 'string', '__options__': ['hello', 'there']}
	])

	// Check the length
	test('Length is 2', () => {
		expect(oOption.length).toBe(2);
	});

	// Check the JSON
	test('Structures match', () => {
		let iTest = 0;
		for(const o of oOption) {
			expect(o?.toJSON()).toBe(l[iTest]);
			++iTest;
		}
	});
});