import { describe, expect, test } from '@jest/globals';
import { Tree } from '../src/';

describe('Complex Structures', () => {

	// Create a complex structure with all types of data just to make sure
	//	everything runs as expected. We don't need to test/verify the data,
	//	as the other methods will do that. This is more to make sure multi-
	//	level structures work as expected by calling each other
	const oComplex = new Tree({
		__name__: 'Complex',
		array: {
			__array__: 'unique',
			__type__: {
				string: {__type__: 'string'},
				unsigned: {__type__: 'uint'},
				date: {__type__: 'date'}
			}
		},
		hash: {
			__hash__: 'uuid',
			__type__: {
				boolean: {__type__: 'bool'},
				price: {__type__: 'price'},
				float: {__type__: 'float'}
			}
		},
		options: [
			{__type__: 'date'},
			{__type__: 'datetime'}
		],
		parent: {
			any: {__type__: 'any'},
			base64: {__type__: 'base64'},
			parent_again: {
				integer: {__type__: 'int'},
				md5: {__type__: 'md5'}
			}
		}
	});

	// Create test data
	const dComplex1: Record<string, any> = {
		array: [
			{string: 'Hello', unsigned: 100, date: '2022-01-01'},
			{string: 'There', unsigned: 0, date: '1981-05-02'},
			{string: 'Friend', unsigned: 13, date: '1950-04-23'}
		],
		hash: {
			'52cd4b20-ca32-4433-9516-0c8684ec57c2': {
				boolean: true, price: '9.99', float: 9.9
			},
			'3b44c5ed-0fea-4478-9f1b-939ae6ec0721': {
				boolean: false, price: '0.99', float: 0.999
			},
			'6432b16a-7e27-47cd-8360-82d82ac70078': {
				boolean: true, price: '10.00', float: 10.01
			}
		},
		options: '2000-12-23',
		parent: {
			any: 1,
			base64: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==',
			parent_again: {
				integer: -10,
				md5: '7b967af699a0a18b1f2bdc9704537a3e'
			}
		}
	}

	// Clean
	test('Clean runs', () => {
		expect(oComplex.clean(dComplex1)).toBeTruthy();
	});

	// Validate
	test('Valid runs', () => {
		expect(oComplex.valid(dComplex1)).toBe(true);
	});

	// Create another instance
	const dComplex2: Record<string, any> = {
		'array': [
			{'string': 'Stuff', 'unsigned': 7676, 'date': '3000-06-01'}
		],
		'hash': {
			'6432b16a-7e27-47cd-8360-82d82ac70078': {
				boolean: false, price: '0.01', float: .000001
			}
		},
		options: '2000-12-23 12:23:05',
		parent: {
			any: 2,
			base64: 'SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==',
			parent_again: {
				integer: 0,
				md5: '7b967af699a0a18b1f2bdc9704537a3e'
			}
		}
	}

	// Clean
	test('Clean runs', () => {
		expect(oComplex.clean(dComplex2)).toBeTruthy();
	});

	// Validate
	test('Valid runs', () => {
		expect(oComplex.valid(dComplex2)).toBe(true);
	});
});