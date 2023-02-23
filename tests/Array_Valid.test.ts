import { describe, expect, test } from '@jest/globals';
import { ArrayNode } from '../src/';

describe('Unique Arrays', () => {

	// Create an array that only allows uniques
	const a = new ArrayNode({
		__array__: 'unique',
		__type__: 'decimal'
	});

	// Test for true
	test('["0.3","2.4","3.5","4.6"] is a valid unique decimal array', () => {
		expect(a.valid(['0.3','2.4','3.5','4.6'])).toBe(true);
	});
	test('["0.1","0.11","0.111","0.1111"] is a valid unique decimal array', () => {
		expect(a.valid(['0.1','0.11','0.111','0.1111'])).toBe(true);
	});

	// Test for false
	const b = a.valid(['2','2','3']);
	const vf = a.validationFailures;
	test('["2","2","3"] is not a valid unique decimal array', () => {
		expect(b).toBe(false);
	});
	test('fail name is correct: ' + String(vf[0][0]), () => {
		expect(vf[0][0] == '[1]').toBe(true);
	});
	test('fail value is correct: ' + String(vf[0][1]), () => {
		expect(vf[0][1] == 'duplicate of [0]').toBe(true);
	});
});

describe('Duplicate Array', () => {

	// Create an array that allows duplicates
	const a = new ArrayNode({
		__array__: 'duplicates',
		__type__: 'decimal'
	});

	// Test for true
	test('["0.3","2.4","0.3","4.6"] is a valid decimal array', () => {
		expect(a.valid(['0.3','2.4','0.3','4.6'])).toBe(true);
	});
	test('["0.1","0.11","0.1","0.1111"] is a valid decimal array', () => {
		expect(a.valid(['0.1','0.11','0.1','0.1111'])).toBe(true);
	});

	// Test for false
	let b = a.valid(['Hello',2,3]);
	let vf = a.validationFailures;
	test('["Hello",2,3] is not a valid unique decimal array', () => {
		expect(b).toBe(false);
	})
	test('fail name is correct: ' + String(vf[0][0]), () => {
		expect(vf[0][0] === '[0]').toBe(true);
	})
	test('fail value is correct: ' + String(vf[0][1]), () => {
		expect(vf[0][1] === 'can not be converted to decimal').toBe(true);
	})
});