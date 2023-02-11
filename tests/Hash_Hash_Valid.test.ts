import { describe, expect, test } from '@jest/globals';
import { HashNode } from '../';

describe('Hash of Hashes', () => {

	// Create a hash of hashes
	const oHash = new HashNode({
		__hash__: 'string',
		__type__: {
			__hash__: 'string',
			__type__: 'uint'
		}
	});

	// Check for true
	test('Data is valid', () => {
		expect(oHash.valid({
			'test':{
				'un':1,
				'deux':2,
				'trois':3
			},
			'this':{
				'one':1,
				'two':2,
				'three':3
			}
		})).toBe(true);
	})

	// Check for false
	test('Data is invalid', () => {
		expect(oHash.valid({
			'test':{
				'un':1,
				'deux':2,
				'trois':3
			},
			'me':1
		})).toBe(false);
	});
});