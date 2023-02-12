import { describe, expect, test } from '@jest/globals';
import { Decimal, Node } from '../';

// Test 'date' Nodes
describe('date', () => {

	// Create a new minmax date Node module
	const oNode = new Node({
		__type__: 'date',
		__minimum__: '2016-01-01',
		__maximum__: '2016-12-31'
	});

	// Check for True
	test('"2016-01-01" is between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('2016-01-01')).toBe(true);
	});
	test('"2016-05-02" is between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('2016-05-02')).toBe(true);
	});
	test('"2016-10-05" is between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('2016-10-05')).toBe(true);
	});
	test('"2016-12-31" is between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('2016-12-31')).toBe(true);
	});

	// Check for False
	test('"2015-12-31" is not between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('2015-12-31')).toBe(false);
	});
	test('"2017-01-01" is not between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('2017-01-01')).toBe(false);
	});
	test('"3010-01-01" is not between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('3010-01-01')).toBe(false);
	});
	test('"1970-01-01" is not between "2016-01-01" and "2016-12-31"', () => {
		expect(oNode.valid('1970-01-01')).toBe(false);
	});
});

// Test 'datetime' Nodes
describe('datetime', () => {

	// Create a new minmax datetime Node module
	const oNode = new Node({
		__type__: 'datetime',
		__minimum__: '2016-01-01 10:00:00',
		__maximum__: '2016-12-31 12:00:00'
	});

	// Check for True
	test('"2016-01-01 12:00:00" is between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('2016-01-01 12:00:00')).toBe(true);
	});
	test('"2016-05-02 12:23:34" is between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('2016-05-02 12:23:34')).toBe(true);
	});
	test('"2016-10-05 09:12:23" is between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('2016-10-05 09:12:23')).toBe(true);
	});
	test('"2016-12-31 10:00:00" is between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('2016-12-31 10:00:00')).toBe(true);
	});

	// Check for False
	test('"2015-12-31 12:00:01" is not between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('2016-12-31 12:00:01')).toBe(false);
	});
	test('"2017-01-01 00:00:00" is not between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('2017-01-01 00:00:00')).toBe(false);
	});
	test('"3010-01-01 00:00:00" is not between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('3010-01-01 00:00:00')).toBe(false);
	});
	test('"1970-01-01 09:59:59" is not between "2016-01-01 10:00:00" and "2016-12-31 12:00:00"', () => {
		expect(oNode.valid('2016-01-01 09:59:59')).toBe(false);
	});
});

// Test 'decimal' Nodes
describe('decimal', () => {

	// Create a new minmax decimal Node module
	const oNode = new Node({
		__type__: 'decimal',
		__minimum__: new Decimal('-10.0'),
		__maximum__: new Decimal('10.0')
	});

	// Check for True
	test('-10 is between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('-10'))).toBe(true);
	});
	test('-5.61 is between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('-5.61'))).toBe(true);
	});
	test('0.1 is between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('0.1'))).toBe(true);
	});
	test('6.20982 is between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('6.20982'))).toBe(true);
	});

	// Check for False
	test('-10.00001 is not between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('-10.00001'))).toBe(false);
	});
	test('-2000.01 is not between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('-2000.01'))).toBe(false);
	});
	test('13 is not between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('13.314'))).toBe(false);
	});
	test('11 is not between -10.0 and 10.0', () => {
		expect(oNode.valid(new Decimal('11'))).toBe(false);
	});
});

// Test 'int' Nodes
describe('int', () => {

	// Create a new minmax int Node module
	const oNode = new Node({
		__type__: 'int',
		__minimum__: '-10',
		__maximum__: 10
	});

	// Check for True
	test('-10 is between -10 and 10', () => {
		expect(oNode.valid(-10)).toBe(true);
	});
	test('-5 is between -10 and 10', () => {
		expect(oNode.valid(-5)).toBe(true);
	});
	test('0 is between -10 and 10', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('6 is between -10 and 10', () => {
		expect(oNode.valid(6)).toBe(true);
	});

	// Check for False
	test('-11 is not between -10 and 10', () => {
		expect(oNode.valid(-11)).toBe(false);
	});
	test('-2000 is not between -10 and 10', () => {
		expect(oNode.valid(-2000)).toBe(false);
	});
	test('13 is not between -10 and 10', () => {
		expect(oNode.valid(13)).toBe(false);
	});
	test('11 is not between -10 and 10', () => {
		expect(oNode.valid(11)).toBe(false);
	});
});

// Test 'ip' Nodes
describe('ip', () => {

	// Create a new minmax ip Node module
	const oNode = new Node({
		__type__: 'ip',
		__minimum__: '192.168.0.1',
		__maximum__: '192.168.1.1'
	});

	// Check for True
	test('"192.168.1.0" is between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('192.168.1.0')).toBe(true);
	});
	test('"192.168.0.1" is between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('192.168.0.1')).toBe(true);
	});
	test('"192.168.1.1" is between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('192.168.1.1')).toBe(true);
	});
	test('"192.168.0.246" is between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('192.168.0.246')).toBe(true);
	});
	test('"192.168.0.13" is between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('192.168.0.13')).toBe(true);
	});

	// Check for False
	test('"192.169.0.1" is not between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('192.169.0.1')).toBe(false);
	});
	test('"193.168.0.1" is not between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('193.168.0.1')).toBe(false);
	});
	test('"192.0.0.1" is not between "192.168.0.1" and "192.168.1.1"', () => {
		expect(oNode.valid('192.0.0.1')).toBe(false);
	});
});

// Test 'string' Nodes
describe('string', () => {

	// Create a new minmax string Node module
	const oNode = new Node({
		__type__: 'string',
		__minimum__: 3,
		__maximum__: 12
	});

	// Check for True
	test('the length of "hello" is between 3 and 12 characters', () => {
		expect(oNode.valid('hello')).toBe(true);
	});
	test('the length of "1234" is between 3 and 12 characters', () => {
		expect(oNode.valid('1234')).toBe(true);
	});
	test('the length of "Wonderful" is between 3 and 12 characters', () => {
		expect(oNode.valid('Wonderful')).toBe(true);
	});
	test('the length of "			" is between 3 and 12 characters', () => {
		expect(oNode.valid('            ')).toBe(true);
	});

	// Check for False
	test('the length of "" is not between 3 and 12 characters', () => {
		expect(oNode.valid('')).toBe(false);
	});
	test('the length of "me" is not between 3 and 12 characters', () => {
		expect(oNode.valid('me')).toBe(false);
	});
	test('the length of "Hello World!" is not between 3 and 12 characters', () => {
		expect(oNode.valid('Hello, World!')).toBe(false);
	});
	test('the length of "			 " is not between 3 and 12 characters', () => {
		expect(oNode.valid('             ')).toBe(false);
	});
});

// Test 'time' Nodes
describe('time', () => {

	// Create a new minmax time Node module
	const oNode = new Node({
		__type__: 'time',
		__minimum__: '10:00:00',
		__maximum__: '12:00:00'
	});

	// Check for True
	test('"12:00:00" is between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('12:00:00')).toBe(true);
	});
	test('"11:23:34" is between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('11:23:34')).toBe(true);
	});
	test('"10:12:23" is between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('10:12:23')).toBe(true);
	});
	test('"10:00:00" is between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('10:00:00')).toBe(true);
	});

	// Check for False
	test('"12:00:01" is not between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('12:00:01')).toBe(false);
	});
	test('"00:00:00" is not between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('00:00:00')).toBe(false);
	});
	test('"23:59:59" is not between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('23:59:59')).toBe(false);
	});
	test('"09:59:59" is not between "10:00:00" and "12:00:00"', () => {
		expect(oNode.valid('09:59:59')).toBe(false);
	});
});

// Test 'timestamp' Nodes
describe('timestamp', () => {

	// Create a new minmax timestamp Node module
	const oNode = new Node({
		__type__: 'timestamp',
		__minimum__: '10',
		__maximum__: 10000
	});

	// Check for True
	test('10 is between 10 and 10000', () => {
		expect(oNode.valid(10)).toBe(true);
	});
	test('100 is between 10 and 10000', () => {
		expect(oNode.valid(100)).toBe(true);
	});
	test('1000 is between 10 and 10000', () => {
		expect(oNode.valid(1000)).toBe(true);
	});
	test('9999 is between 10 and 10000', () => {
		expect(oNode.valid(9999)).toBe(true);
	});

	// Check for False
	test('-11 is not between 10 and 10000', () => {
		expect(oNode.valid(-11)).toBe(false);
	});
	test('-2000 is not between 10 and 10000', () => {
		expect(oNode.valid(-2000)).toBe(false);
	});
	test('10013 is not between 10 and 10000', () => {
		expect(oNode.valid(10013)).toBe(false);
	});
	test('9 is not between 10 and 10000', () => {
		expect(oNode.valid(9)).toBe(false);
	});
});

// Test 'uint' Nodes
describe('uint', () => {

	// Create a new minmax uint Node module
	const oNode = new Node({
		__type__: 'uint',
		__minimum__: '10',
		__maximum__: 10000
	});

	// Check for True
	test('10 is between 10 and 10000', () => {
		expect(oNode.valid(10)).toBe(true);
	});
	test('100 is between 10 and 10000', () => {
		expect(oNode.valid(100)).toBe(true);
	});
	test('1000 is between 10 and 10000', () => {
		expect(oNode.valid(1000)).toBe(true);
	});
	test('9999 is between 10 and 10000', () => {
		expect(oNode.valid(9999)).toBe(true);
	});

	// Check for False
	test('-11 is not between 10 and 10000', () => {
		expect(oNode.valid(-11)).toBe(false);
	});
	test('-2000 is not between 10 and 10000', () => {
		expect(oNode.valid(-2000)).toBe(false);
	});
	test('10013 is not between 10 and 10000', () => {
		expect(oNode.valid(10013)).toBe(false);
	});
	test('9 is not between 10 and 10000', () => {
		expect(oNode.valid(9)).toBe(false);
	});
});