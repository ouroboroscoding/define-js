import { describe, expect, test } from '@jest/globals';
import { Node } from '../';

// Test 'any' Nodes
describe('any', () => {

	// Create a basic any Node
	let oNode	= new Node({
		__type__: 'any'
	});

	// Check for true
	test('0 equals 0', () => {
		expect(oNode.clean(0)).toBe(0);
	});
	test('0.1 equals 0.1', () => {
		expect(oNode.clean(0.1)).toBe(0.1);
	});
	test('"0" equals "0"', () => {
		expect(oNode.clean('0')).toBe('0');
	});
	test('true equals true', () => {
		expect(oNode.clean(true)).toBe(true);
	});
	test('[] equals []', () => {
		expect(JSON.stringify(oNode.clean([]))).toBe(JSON.stringify([]));
	});
	test('{} equals {}', () => {
		expect(JSON.stringify(oNode.clean({}))).toBe(JSON.stringify({}));
	});
});

// Test 'bool' Nodes
describe('bool', () => {

	// Create a basic bool Node
	const oNode = new Node({
		__type__: 'bool'
	});

	// Check for true
	test('true equals true', () => {
		expect(oNode.clean(true)).toBe(true);
	});
	test('false equals false', () => {
		expect(oNode.clean(false)).toBe(false);
	});
	test('"1" equals true', () => {
		expect(oNode.clean('1')).toBe(true);
	});
	test('"0" equals false', () => {
		expect(oNode.clean('0')).toBe(false);
	});
	test('"Y" equals true', () => {
		expect(oNode.clean('Y')).toBe(true);
	});
	test('"" equals false', () => {
		expect(oNode.clean('')).toBe(false);
	});
	test('1 equals true', () => {
		expect(oNode.clean(1)).toBe(true);
	});
	test('0 equals false', () => {
		expect(oNode.clean(0)).toBe(false);
	});
	test('0.1 equals true', () => {
		expect(oNode.clean(0.1)).toBe(true);
	});
	test('0.0 equals false', () => {
		expect(oNode.clean(0.0)).toBe(false);
	});
});

// Test 'date' Nodes
describe('date', () => {

	// Create a basic date Node
	const oNode = new Node({
		__type__: 'date'
	});

	// Check for true
	test('"0000-00-00" equals "0000-00-00"', () => {
		expect(oNode.clean('0000-00-00')).toBe('0000-00-00');
	});
	test('"1981-05-02" equals "1981-05-02"', () => {
		expect(oNode.clean('1981-05-02')).toBe('1981-05-02');
	});
	test('new Date(1981,5,2) equals "1981-05-02"', () => {
		expect(oNode.clean(new Date(1981,5,2))).toBe('1981-05-02');
	});
	test('new Date(1981,5,2,12,23,0) equals "1981-05-02"', () => {
		expect(oNode.clean(new Date(1981,5,2,12,23,0))).toBe('1981-05-02');
	});
});

// Test 'datetime' Nodes
describe('datetime', () => {

	// Create a basic datetime Node
	const oNode = new Node({
		__type__: 'datetime'
	});

	// Check for true
	test('"0000-00-00 00:00:00" equals "0000-00-00 00:00:00"', () => {
		expect(oNode.clean('0000-00-00 00:00:00')).toBe('0000-00-00 00:00:00');
	});
	test('"1981-05-02 12:23:00" equals "1981-05-02 12:23:00"', () => {
		expect(oNode.clean('1981-05-02 12:23:00')).toBe('1981-05-02 12:23:00');
	});
	test('new Date(1981,5,2) equals "1981-05-02 00:00:00"', () => {
		expect(oNode.clean(new Date(1981,5,2))).toBe('1981-05-02 00:00:00');
	});
	test('new Date(1981,5,2,12,23,0) equals "1981-05-02 12:23:00"', () => {
		expect(oNode.clean(new Date(1981,5,2,12,23,0))).toBe('1981-05-02 12:23:00');
	});
});

// Test 'decimal' Nodes
describe('decimal', () => {

	// Create a basic decimal Node
	const oNode = new Node({
		__type__: 'decimal'
	});

	// Check for true
	test('"0.0" equals "0.0"', () => {
		expect(oNode.clean('0.0')).toBe('0.0');
	});
	test('"3.14" equals "3.14"', () => {
		expect(oNode.clean('3.14')).toBe('3.14');
	});
	test('"-3.14" equals "-3.14"', () => {
		expect(oNode.clean('-3.14')).toBe('-3.14');
	});
	test('3 equals "3"', () => {
		expect(oNode.clean(3)).toBe('3');
	});
	test('"3" equals "3"', () => {
		expect(oNode.clean('3')).toBe('3');
	});
});

// Test 'float' Nodes
describe('float', () => {

	// Create a basic float Node
	const oNode = new Node({
		__type__: 'float'
	});

	// Check for true
	test('0.0 equals 0.0', () => {
		expect(oNode.clean(0.0)).toBe(0.0);
	});
	test('3.14 equals 3.14', () => {
		expect(oNode.clean(3.14)).toBe(3.14);
	});
	test('-3.14 equals -3.14', () => {
		expect(oNode.clean(-3.14)).toBe(-3.14);
	});
	test('"0.0" equals 0.0', () => {
		expect(oNode.clean('0.0')).toBe(0.0);
	});
	test('"3.14" equals 3.14', () => {
		expect(oNode.clean('3.14')).toBe(3.14);
	});
	test('"-3.14" equals -3.14', () => {
		expect(oNode.clean('-3.14')).toBe(-3.14);
	});
	test('3 equals 3.0', () => {
		expect(oNode.clean(3)).toBe(3.0);
	});
	test('"3" equals 3.0', () => {
		expect(oNode.clean('3')).toBe(3.0);
	});
	test('"3.00" equals 3.0', () => {
		expect(oNode.clean('3.00')).toBe(3.0);
	});
});

// Test 'int' Nodes
describe('int', () => {

	// Create a basic int Node
	const oNode = new Node({
		__type__: 'int'
	});

	// Check for true
	test('0 equals 0', () => {
		expect(oNode.clean(0)).toBe(0);
	});
	test('1 equals 1', () => {
		expect(oNode.clean(1)).toBe(1);
	});
	test('-1 equals -1', () => {
		expect(oNode.clean(-1)).toBe(-1);
	});
	test('3.14 equals 3', () => {
		expect(oNode.clean(3.14)).toBe(3);
	});
	test('3 equals 3', () => {
		expect(oNode.clean(3)).toBe(3);
	});
	test('"3" equals 3', () => {
		expect(oNode.clean('3')).toBe(3);
	});
	test('"-3" equals -3', () => {
		expect(oNode.clean('-3')).toBe(-3);
	});
});

// Test 'ip' Nodes
describe('ip', () => {

	// Create a basic ip Node
	const oNode = new Node({
		__type__: 'ip'
	});

	// Check for true
	test('"127.0.0.1" equals "127.0.0.1"', () => {
		expect(oNode.clean('127.0.0.1')).toBe('127.0.0.1');
	});
	test('"10.0.0.1" equals "10.0.0.1"', () => {
		expect(oNode.clean('10.0.0.1')).toBe('10.0.0.1');
	});
	test('"255.255.255.255" equals "255.255.255.255"', () => {
		expect(oNode.clean('255.255.255.255')).toBe('255.255.255.255');
	});
});

// Test 'json' Nodes
describe('json', () => {

	// Create a basic json Node
	const oNode = new Node({
		__type__: 'json'
	});

	// Check for true
	test('"{"hello":"there"}" equals "{"hello":"there"}"', () => {
		expect(oNode.clean('{"hello":"there"}')).toBe('{"hello":"there"}');
	});
	test('"hello" equals "hello"', () => {
		expect(oNode.clean('"hello"')).toBe('"hello"');
	});
	test('{\'Hello\':\'there\'} equals "{"Hello":"there"}"', () => {
		expect(oNode.clean({'Hello':'there'})).toBe('{"Hello":"there"}');
	});
	test('[1,2,34] equals "[1,2,34]"', () => {
		expect(oNode.clean([1,2,34])).toBe('[1,2,34]');
	});
});

// Test 'md5' Nodes
describe('md5', () => {

	// Create a basic md5 Node
	const oNode = new Node({
		__type__: 'md5'
	});

	// Check for true
	test('"65a8e27d8879283831b664bd8b7f0ad4" equals "65a8e27d8879283831b664bd8b7f0ad4"', () => {
		expect(oNode.clean('65a8e27d8879283831b664bd8b7f0ad4')).toBe('65a8e27d8879283831b664bd8b7f0ad4');
	});
});

// Test 'price' Nodes
describe('price', () => {

	// Create a basic price Node
	const oNode = new Node({
		__type__: 'price'
	});

	// Check for true
	test('0.0 equals "0.00"', () => {
		expect(oNode.clean(0.0)).toBe('0.00');
	});
	test('"0.0" equals "0.00"', () => {
		expect(oNode.clean('0.0')).toBe('0.00');
	});
	test('"3.1" equals "3.10"', () => {
		expect(oNode.clean('3.1')).toBe('3.10');
	});
	test('"-3.1" equals "-3.10"', () => {
		expect(oNode.clean('-3.1')).toBe('-3.10');
	});
	test('"3.14" equals "3.14"', () => {
		expect(oNode.clean('3.14')).toBe('3.14');
	});
	test('"-3.14" equals "-3.14"', () => {
		expect(oNode.clean('-3.14')).toBe('-3.14');
	});
	test('3 equals "3.00"', () => {
		expect(oNode.clean(3)).toBe('3.00');
	});
	test('"3" equals "3.00"', () => {
		expect(oNode.clean('3')).toBe('3.00');
	});
});

// Test 'string' Nodes
describe('string', () => {

	// Create a basic string Node
	const oNode = new Node({
		__type__: 'string'
	});

	// Check for true
	test('"127.0.0.1" equals "127.0.0.1"', () => {
		expect(oNode.clean('127.0.0.1')).toBe('127.0.0.1');
	});
	test('"10.0.0.1" equals "10.0.0.1"', () => {
		expect(oNode.clean('10.0.0.1')).toBe('10.0.0.1');
	});
	test('"255.255.255.255" equals "255.255.255.255"', () => {
		expect(oNode.clean('255.255.255.255')).toBe('255.255.255.255');
	});
	test('0 equals "0"', () => {
		expect(oNode.clean(0)).toBe('0');
	});
	test('3.14 equals "3.14"', () => {
		expect(oNode.clean(3.14)).toBe('3.14');
	});
});

// Test 'time' Nodes
describe('time', () => {

	// Create a basic time Node
	const oNode = new Node({
		__type__: 'time'
	});

	// Check for true
	test('"0000-00-00 00:00:00" equals "00:00:00"', () => {
		expect(oNode.clean('00:00:00')).toBe('00:00:00');
	});
	test('"1981-05-02 12:23:00" equals "12:23:00"', () => {
		expect(oNode.clean('12:23:00')).toBe('12:23:00');
	});
	test('new Date(1981,5,2,12,23,0) equals "12:23:00"', () => {
		expect(oNode.clean(new Date(1981,5,2,12,23,0))).toBe('12:23:00');
	});
});

// Test 'timestamp' Nodes
describe('timestamp', () => {

	// Create a basic timestamp Node
	const oNode = new Node({
		__type__: 'timestamp'
	});

	// Check for true
	test('0 equals 0', () => {
		expect(oNode.clean(0)).toBe(0);
	});
	test('1 equals 1', () => {
		expect(oNode.clean(1)).toBe(1);
	});
	test('3.14 equals 3', () => {
		expect(oNode.clean(3.14)).toBe(3);
	});
	test('3 equals 3', () => {
		expect(oNode.clean(3)).toBe(3);
	});
	test('"3" equals 3', () => {
		expect(oNode.clean('3')).toBe(3);
	});
});

// Test 'uint' Nodes
describe('uint', () => {

	// Create a basic uint Node
	const oNode = new Node({
		__type__: 'uint'
	});

	// Check for true
	test('0 equals 0', () => {
		expect(oNode.clean(0)).toBe(0);
	});
	test('1 equals 1', () => {
		expect(oNode.clean(1)).toBe(1);
	});
	test('3.14 equals 3', () => {
		expect(oNode.clean(3.14)).toBe(3);
	});
	test('3 equals 3', () => {
		expect(oNode.clean(3)).toBe(3);
	});
	test('"3" equals 3', () => {
		expect(oNode.clean('3')).toBe(3);
	});
});

// Test 'uuid' Nodes
describe('uuid', () => {

	// Create a basic uuid Node
	const oNode = new Node({
		__type__: 'uuid'
	});

	test('"52cd4b20-ca32-4433-9516-0c8684ec57c2" equals "52cd4b20-ca32-4433-9516-0c8684ec57c2"', () => {
		expect(oNode.clean('52cd4b20-ca32-4433-9516-0c8684ec57c2')).toBe('52cd4b20-ca32-4433-9516-0c8684ec57c2');
	});
	test('"3b44c5ed-0fea-4478-9f1b-939ae6ec0721" equals "3b44c5ed-0fea-4478-9f1b-939ae6ec0721"', () => {
		expect(oNode.clean('3b44c5ed-0fea-4478-9f1b-939ae6ec0721')).toBe('3b44c5ed-0fea-4478-9f1b-939ae6ec0721');
	});
	test('"6432b16a-7e27-47cd-8360-82d82ac70078" equals "6432b16a-7e27-47cd-8360-82d82ac70078"', () => {
		expect(oNode.clean('6432b16a-7e27-47cd-8360-82d82ac70078')).toBe('6432b16a-7e27-47cd-8360-82d82ac70078');
	});
});