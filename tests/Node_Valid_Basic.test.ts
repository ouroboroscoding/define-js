import { describe, expect, test } from '@jest/globals';
import { Node } from '../src/';

// Test 'any' Nodes
describe('any', () => {

	// Create a new basic any Node module
	const oNode = new Node({
		'__type__': 'any'
	});

	// Check for true
	test('1 is a valid any', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is a valid any', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('-1 is a valid any', () => {
		expect(oNode.valid(-1)).toBe(true);
	});
	test('"0" is a valid any', () => {
		expect(oNode.valid('0')).toBe(true);
	});
	test('"1" is a valid any', () => {
		expect(oNode.valid('1')).toBe(true);
	});
	test('"-1" is a valid any', () => {
		expect(oNode.valid('-1')).toBe(true);
	});
	test('"0xff" is a valid any', () => {
		expect(oNode.valid('0xff')).toBe(true);
	});
	test('"07" is a valid any', () => {
		expect(oNode.valid('07')).toBe(true);
	});
	test('"Hello" is a valid any', () => {
		expect(oNode.valid('Hello')).toBe(true);
	});
	test('true is a valid any', () => {
		expect(oNode.valid(true)).toBe(true);
	});
	test('0.1 is a valid any', () => {
		expect(oNode.valid(0.1)).toBe(true);
	});
	test('"0.1" is a valid any', () => {
		expect(oNode.valid('0.1')).toBe(true);
	});
	test('"192.168.0.1" is a valid any', () => {
		expect(oNode.valid('192.168.0.1')).toBe(true);
	});
	test('"2016-03-05" is a valid any', () => {
		expect(oNode.valid('2016-03-05')).toBe(true);
	});
	test('"13:50:00" is a valid any', () => {
		expect(oNode.valid('13:50:00')).toBe(true);
	});
	test('"2016-03-05 13:50:00" is a valid any', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(true);
	});
	test('[] is a valid any', () => {
		expect(oNode.valid([])).toBe(true);
	});
	test('{} is a valid any', () => {
		expect(oNode.valid({})).toBe(true);
	});
});

// Test 'base64' Nodes
describe('base64', () => {

	// Create a new basic base64 Node module
	const oNode = new Node({
		'__type__': 'base64'
	});

	// Check for True
	test('"SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==" is a valid base64', () => {
		expect(oNode.valid('SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==')).toBe(true);
	});
	test('"WW8gWW8gWW8=" is a valid base64', () => {
		expect(oNode.valid('WW8gWW8gWW8=')).toBe(true);
	});
	test('"RG92ZXRhaWwgaXMgdGhlIHNoaXQu" is a valid base64', () => {
		expect(oNode.valid('RG92ZXRhaWwgaXMgdGhlIHNoaXQu')).toBe(true);
	});

	// Check for False
	test('"Hello" is not a valid base64', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('"WW8gWW8gWW8===" is not a valid base64', () => {
		expect(oNode.valid('WW8gWW8gWW8===')).toBe(false);
	});
	test('"" is not a valid base64', () => {
		expect(oNode.valid('')).toBe(false);
	});
});

// Test 'bool' Nodes
describe('bool', () => {

	// Create a new basic bool Node module
	const oNode = new Node({
		'__type__': 'bool'
	});

	// Check for true
	test('true is a valid bool', () => {
		expect(oNode.valid(true)).toBe(true);
	});
	test('false is a valid bool', () => {
		expect(oNode.valid(false)).toBe(true);
	});
	test('1 is a valid bool', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is a valid bool', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	let lBoolStrings = ['true', 'true', 'TRUE', 't', 'T', '1', 'false', 'false', 'FALSE', 'f', 'F', '0'];
	for(let i in lBoolStrings) {
		test('"' + lBoolStrings[i] + '" is a valid bool', () => {
		expect(oNode.valid(lBoolStrings[i])).toBe(true);
	});
	}

	// Check for false
	test('"Hello" is not a valid bool', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('2 is not a valid bool', () => {
		expect(oNode.valid(2)).toBe(false);
	});
	test('1.2 is not a valid bool', () => {
		expect(oNode.valid(1.2)).toBe(false);
	});
	test('"192.168.0.1" is not a valid bool', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid bool', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid bool', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid bool', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid bool', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid bool', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'date' Nodes
describe('date', () => {

	// Create a new basic date Node module
	const oNode = new Node({
		'__type__': 'date'
	});

	// Check for true
	test('"2016-03-05" is a valid date', () => {
		expect(oNode.valid('2016-03-05')).toBe(true);
	});
	test('"2020-12-25" is a valid date', () => {
		expect(oNode.valid('2020-12-25')).toBe(true);
	});
	test('"1970-01-01" is a valid date', () => {
		expect(oNode.valid('1970-01-01')).toBe(true);
	});
	test('new Date(1981,5,2) is a valid date', () => {
		expect(oNode.valid(new Date(1981,5,2))).toBe(true);
	});
	test('new Date(1981,5,2,12,23,0) is a valid date', () => {
		expect(oNode.valid(new Date(1981,5,2,12,23,0))).toBe(true);
	});

	// Check for false
	test('"70-01-01" is not a valid date', () => {
		expect(oNode.valid('70-01-01')).toBe(false);
	});
	test('"10000-01-01" is not a valid date', () => {
		expect(oNode.valid('10000-01-01')).toBe(false);
	});
	test('"1970-00-01" is not a valid date', () => {
		expect(oNode.valid('1970-00-01')).toBe(false);
	});
	test('"2000-12-00" is not a valid date', () => {
		expect(oNode.valid('2000-12-00')).toBe(false);
	});
	test('"2000-12-32" is not a valid date', () => {
		expect(oNode.valid('2000-12-32')).toBe(false);
	});
	test('"2000-13-10" is not a valid date', () => {
		expect(oNode.valid('2000-13-10')).toBe(false);
	});
	test('"Hello" is not a valid date', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid date', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('2 is not a valid date', () => {
		expect(oNode.valid(2)).toBe(false);
	});
	test('1.2 is not a valid date', () => {
		expect(oNode.valid(1.2)).toBe(false);
	});
	test('"192.168.0.1" is not a valid date', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"13:50:00" is not a valid date', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid date', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid date', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid date', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'datetime' Nodes
describe('datetime', () => {

	// Create a new basic datetime Node module
	const oNode = new Node({
		'__type__': 'datetime'
	});

	// Check for true
	test('"10:04:00" is a valid datetime', () => {
		expect(oNode.valid('2016-03-05 10:04:00')).toBe(true);
	});
	test('"00:00:00" is a valid datetime', () => {
		expect(oNode.valid('2020-12-25 00:00:00')).toBe(true);
	});
	test('"12:23:34" is a valid datetime', () => {
		expect(oNode.valid('2020-12-25 12:23:34')).toBe(true);
	});
	test('"02:56:12" is a valid datetime', () => {
		expect(oNode.valid('1970-01-01 02:56:12')).toBe(true);
	});
	test('new Date(1981,5,2) is a valid datetime', () => {
		expect(oNode.valid(new Date(1981,5,2))).toBe(true);
	});
	test('new Date(1981,5,2,12,23,0) is a valid datetime', () => {
		expect(oNode.valid(new Date(1981,5,2,12,23,0))).toBe(true);
	});

	// Check for false
	test('"2016-03-05 1:00:00" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05 1:00:00')).toBe(false);
	});
	test('"2016-03-05 100:01:00" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05 100:01:00')).toBe(false);
	});
	test('"2016-03-05 24:00:00" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05 24:00:00')).toBe(false);
	});
	test('"2016-03-05 00:0:00" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05 00:0:00')).toBe(false);
	});
	test('"2016-03-05 00:00:0" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05 00:00:0')).toBe(false);
	});
	test('"2016-03-05 23:60:00" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05 23:60:00')).toBe(false);
	});
	test('"2016-03-05 23:00:60" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05 23:00:60')).toBe(false);
	});
	test('"70-01-01 00:00:00" is not a valid datetime', () => {
		expect(oNode.valid('70-01-01 00:00:00')).toBe(false);
	});
	test('"10000-01-01 00:00:00" is not a valid datetime', () => {
		expect(oNode.valid('10000-01-01 00:00:00')).toBe(false);
	});
	test('"1970-00-01 00:00:00" is not a valid datetime', () => {
		expect(oNode.valid('1970-00-01 00:00:00')).toBe(false);
	});
	test('"2000-12-00 00:00:00" is not a valid datetime', () => {
		expect(oNode.valid('2000-12-00 00:00:00')).toBe(false);
	});
	test('"2000-12-00 00:00:00" is not a valid datetime', () => {
		expect(oNode.valid('2000-12-32 00:00:00')).toBe(false);
	});
	test('"2000-12-00 00:00:00" is not a valid datetime', () => {
		expect(oNode.valid('2000-13-10 00:00:00')).toBe(false);
	});
	test('"Hello" is not a valid datetime', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid datetime', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('2 is not a valid datetime', () => {
		expect(oNode.valid(2)).toBe(false);
	});
	test('1.2 is not a valid datetime', () => {
		expect(oNode.valid(1.2)).toBe(false);
	});
	test('"192.168.0.1" is not a valid datetime', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid datetime', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid decimal', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('[] is not a valid datetime', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid datetime', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'decimal' Nodes
describe('decimal', () => {

	// Create a new basic decimal Node module
	const oNode = new Node({
		'__type__': 'decimal'
	});

	// Check for true
	test('"0" is a valid decimal', () => {
		expect(oNode.valid('1.0')).toBe(true);
	});
	test('"0" is a valid decimal', () => {
		expect(oNode.valid('1.1')).toBe(true);
	});
	test('"0" is a valid decimal', () => {
		expect(oNode.valid('-0.1')).toBe(true);
	});
	test('"0" is a valid decimal', () => {
		expect(oNode.valid('0')).toBe(true);
	});
	test('"1" is a valid decimal', () => {
		expect(oNode.valid('1')).toBe(true);
	});
	test('"-1" is a valid decimal', () => {
		expect(oNode.valid('-1')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid decimal', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid decimal', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('"192.168.0.1" is not a valid decimal', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid decimal', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid decimal', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid decimal', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid decimal', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid decimal', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'float' Nodes
describe('float', () => {

	// Create a new basic float Node module
	const oNode = new Node({
		'__type__': 'float'
	});

	// Check for true
	test('1.0 is a valid float', () => {
		expect(oNode.valid(1.0)).toBe(true);
	});
	test('0.0 is a valid float', () => {
		expect(oNode.valid(0.0)).toBe(true);
	});
	test('-1.0 is a valid float', () => {
		expect(oNode.valid(-1.0)).toBe(true);
	});
	test('"1.0" is a valid float', () => {
		expect(oNode.valid('1.0')).toBe(true);
	});
	test('"0.0" is a valid float', () => {
		expect(oNode.valid('0.0')).toBe(true);
	});
	test('"-1.0" is a valid float', () => {
		expect(oNode.valid('-1.0')).toBe(true);
	});
	test('1 is a valid float', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is a valid float', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('-1 is a valid float', () => {
		expect(oNode.valid(-1)).toBe(true);
	});
	test('"0" is a valid float', () => {
		expect(oNode.valid('0')).toBe(true);
	});
	test('"1" is a valid float', () => {
		expect(oNode.valid('1')).toBe(true);
	});
	test('"-1" is a valid float', () => {
		expect(oNode.valid('-1')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid float', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid float', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('"0xff" is not a valid float', () => {
		expect(oNode.valid('0xff')).toBe(false);
	});
	test('"192.168.0.1" is not a valid float', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid float', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid float', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid float', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid float', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid float', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'int' Nodes
describe('int', () => {

	// Create a new basic int Node module
	const oNode = new Node({
		'__type__': 'int'
	});

	// Check for true
	test('1 is a valid int', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is a valid int', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('-1 is a valid int', () => {
		expect(oNode.valid(-1)).toBe(true);
	});
	test('"0" is a valid int', () => {
		expect(oNode.valid('0')).toBe(true);
	});
	test('"1" is a valid int', () => {
		expect(oNode.valid('1')).toBe(true);
	});
	test('"-1" is a valid int', () => {
		expect(oNode.valid('-1')).toBe(true);
	});
	test('"0xff" is a valid int', () => {
		expect(oNode.valid('0xff')).toBe(true);
	});
	test('"07" is a valid int', () => {
		expect(oNode.valid('07')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid int', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid int', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('0.1 is not a valid int', () => {
		expect(oNode.valid(0.1)).toBe(false);
	});
	test('"192.168.0.1" is not a valid int', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid int', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid int', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid int', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid int', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid int', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'ip' Nodes
describe('ip', () => {

	// Create a new basic IP Node module
	const oNode = new Node({
		'__type__': 'ip'
	});

	// Check for true
	test('"192.168.0.1" is a valid ip', () => {
		expect(oNode.valid('192.168.0.1')).toBe(true);
	});
	test('"10.13.13.1" is a valid ip', () => {
		expect(oNode.valid('10.13.13.1')).toBe(true);
	});
	test('"255.255.255.255" is a valid ip', () => {
		expect(oNode.valid('255.255.255.255')).toBe(true);
	});
	test('"8.8.8.8" is a valid ip', () => {
		expect(oNode.valid('8.8.8.8')).toBe(true);
	});
	test('"66.36.159.171" is a valid ip', () => {
		expect(oNode.valid('66.36.159.171')).toBe(true);
	});
	test('"255.255.255.0" is a valid ip', () => {
		expect(oNode.valid('255.255.255.0')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid ip', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid ip', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('0 is not a valid ip', () => {
		expect(oNode.valid(0)).toBe(false);
	});
	test('0.1 is not a valid ip', () => {
		expect(oNode.valid(0.1)).toBe(false);
	});
	test('"2016-03-05" is not a valid ip', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid ip', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid ip', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid ip', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid ip', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'json' Nodes
describe('json', () => {

	// Create a new basic JSON Node module
	const oNode = new Node({
		'__type__': 'json'
	});

	// Check for true
	test('{"hello":"there","my":1,"true":3.14} is not valid json', () => {
		expect(oNode.valid('{"hello":"there","my":1,"true":3.14}')).toBe(true);
	});
	test('{"hello":[1,2,34],"my":1,"true":true} is not valid json', () => {
		expect(oNode.valid('{"hello":[1,2,34],"my":1,"true":true}')).toBe(true);
	});
	test('["a","b","c","d"] is not valid json', () => {
		expect(oNode.valid('["a","b","c","d"]')).toBe(true);
	});
	test('"Hello" is not valid json', () => {
		expect(oNode.valid('"Hello"')).toBe(true);
	});
	test('true is not valid json', () => {
		expect(oNode.valid('true')).toBe(true);
	});
	test('1 is not valid json', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is not valid json', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('-1 is not valid json', () => {
		expect(oNode.valid(-1)).toBe(true);
	});
	test('"0" is not valid json', () => {
		expect(oNode.valid('0')).toBe(true);
	});
	test('"1" is not valid json', () => {
		expect(oNode.valid('1')).toBe(true);
	});
	test('"-1" is not valid json', () => {
		expect(oNode.valid('-1')).toBe(true);
	});
	test('true is not valid json', () => {
		expect(oNode.valid(true)).toBe(true);
	});
	test('0.1 is not valid json', () => {
		expect(oNode.valid(0.1)).toBe(true);
	});
	test('[] is not valid json', () => {
		expect(oNode.valid([])).toBe(true);
	});
	test('{} is not valid json', () => {
		expect(oNode.valid({})).toBe(true);
	});

	// Check for false
	test('{\'hello\':\'there\'} is valid json', () => {
		expect(oNode.valid('{\'hello\':\'there\'}')).toBe(false);
	});
	test('{hello:[1,2,34]} is valid json', () => {
		expect(oNode.valid('{hello:[1,2,34]}')).toBe(false);
	});
	test('"a","b","c","d" is valid json', () => {
		expect(oNode.valid('"a","b","c","d"')).toBe(false);
	});
	test('"Hello" is valid json', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('"192.168.0.1" is valid json', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is valid json', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is valid json', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is valid json', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
});

// Test 'md5' Nodes
describe('md5', () => {

	// Create a new basic md5 Node module
	const oNode = new Node({
		'__type__': 'md5'
	});

	// Check for true
	test('"7b967af699a0a18b1f2bdc9704537a3e" is a valid md5', () => {
		expect(oNode.valid('7b967af699a0a18b1f2bdc9704537a3e')).toBe(true);
	});
	test('"889ffd8cc409445187c4258d138192b6" is a valid md5', () => {
		expect(oNode.valid('889ffd8cc409445187c4258d138192b6')).toBe(true);
	});
	test('"49c0d2aef0ab2634b0051544cdbf2415" is a valid md5', () => {
		expect(oNode.valid('49c0d2aef0ab2634b0051544cdbf2415')).toBe(true);
	});
	test('"65a8e27d8879283831b664bd8b7f0ad4" is a valid md5', () => {
		expect(oNode.valid('65a8e27d8879283831b664bd8b7f0ad4')).toBe(true);
	});
	test('"746b975324b133ceb2e211af41c049e8" is a valid md5', () => {
		expect(oNode.valid('746b975324b133ceb2e211af41c049e8')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid md5', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('"Hello" is not a valid md5', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('0 is not a valid md5', () => {
		expect(oNode.valid(0)).toBe(false);
	});
	test('0.1 is not a valid md5', () => {
		expect(oNode.valid(0.1)).toBe(false);
	});
	test('"192.168.0.1" is not a valid md5', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid md5', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid md5', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid md5', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid md5', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid md5', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'price' Nodes
describe('price', () => {

	// Create a new basic price Node module
	const oNode = new Node({
		'__type__': 'price'
	});

	// Check for true
	test('1 is a valid price', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is a valid price', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('-1 is a valid price', () => {
		expect(oNode.valid(-1)).toBe(true);
	});
	test('"1.0" is a valid price', () => {
		expect(oNode.valid('1.0')).toBe(true);
	});
	test('"1.1" is a valid price', () => {
		expect(oNode.valid('1.1')).toBe(true);
	});
	test('"-0.1" is a valid price', () => {
		expect(oNode.valid('-0.1')).toBe(true);
	});
	test('"0" is a valid price', () => {
		expect(oNode.valid('0')).toBe(true);
	});
	test('"1" is a valid price', () => {
		expect(oNode.valid('1')).toBe(true);
	});
	test('"-1" is a valid price', () => {
		expect(oNode.valid('-1')).toBe(true);
	});

	// Check for false
	test('1.234 is not a valid price', () => {
		expect(oNode.valid(1.234)).toBe(false);
	});
	test('"0.234" is not a valid price', () => {
		expect(oNode.valid('0.234')).toBe(false);
	});
	test('"Hello" is not a valid price', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid price', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('"192.168.0.1" is not a valid price', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid price', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid price', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid price', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid price', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid price', () => {
		expect(oNode.valid({})).toBe(false);
	});

});

// Test 'string' Nodes
describe('string', () => {

	// Create a new basic string Node module
	const oNode = new Node({
		'__type__': 'string'
	});

	// Check for true
	test('"World!" is a valid string', () => {
		expect(oNode.valid('Hello, World!')).toBe(true);
	});
	test('"0000000" is a valid string', () => {
		expect(oNode.valid('0000000')).toBe(true);
	});
	test('"       " is a valid string', () => {
		expect(oNode.valid('       ')).toBe(true);
	});
	test('"Why\nShould\nThis\nWork\n?" is a valid string', () => {
		expect(oNode.valid('Why\nShould\nThis\nWork\n?')).toBe(true);
	});
	test('"192.168.0.1" is a valid string', () => {
		expect(oNode.valid('192.168.0.1')).toBe(true);
	});
	test('"2016-03-05" is a valid string', () => {
		expect(oNode.valid('2016-03-05')).toBe(true);
	});
	test('"13:50:00" is a valid string', () => {
		expect(oNode.valid('13:50:00')).toBe(true);
	});
	test('"2016-03-05 13:50:00" is a valid string', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid md5', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('"Hello" is not a valid md5', () => {
		expect(oNode.valid(0)).toBe(false);
	});
	test('0.1 is not a valid md5', () => {
		expect(oNode.valid(0.1)).toBe(false);
	});
	test('[] is not a valid md5', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid md5', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'time' Nodes
describe('time', () => {

	// Create a new basic time Node module
	const oNode = new Node({
		'__type__': 'time'
	});

	// Check for true
	test('"10:04:00" is a valid time', () => {
		expect(oNode.valid('10:04:00')).toBe(true);
	});
	test('"00:00:00" is a valid time', () => {
		expect(oNode.valid('00:00:00')).toBe(true);
	});
	test('"12:23:34" is a valid time', () => {
		expect(oNode.valid('12:23:34')).toBe(true);
	});
	test('"02:56:12" is a valid time', () => {
		expect(oNode.valid('02:56:12')).toBe(true);
	});
	test('new Date(1981,5,2,12,23,0) is a valid time', () => {
		expect(oNode.valid(new Date(1981,5,2,12,23,0))).toBe(true);
	});

	// Check for false
	test('"1:00:00" is not a valid time', () => {
		expect(oNode.valid('1:00:00')).toBe(false);
	});
	test('"100:01:00" is not a valid time', () => {
		expect(oNode.valid('100:01:00')).toBe(false);
	});
	test('"24:00:00" is not a valid time', () => {
		expect(oNode.valid('24:00:00')).toBe(false);
	});
	test('"00:0:00" is not a valid time', () => {
		expect(oNode.valid('00:0:00')).toBe(false);
	});
	test('"00:00:0" is not a valid time', () => {
		expect(oNode.valid('00:00:0')).toBe(false);
	});
	test('"23:60:00" is not a valid time', () => {
		expect(oNode.valid('23:60:00')).toBe(false);
	});
	test('"23:00:60" is not a valid time', () => {
		expect(oNode.valid('23:00:60')).toBe(false);
	});
	test('"Hello" is not a valid time', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('true is not a valid time', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('2 is not a valid time', () => {
		expect(oNode.valid(2)).toBe(false);
	});
	test('1.2 is not a valid time', () => {
		expect(oNode.valid(1.2)).toBe(false);
	});
	test('"192.168.0.1" is not a valid time', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid time', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid time', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('[] is not a valid time', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid time', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'timestamp' Nodes
describe('timestamp', () => {

	// Create a new basic timestamp Node module
	const oNode = new Node({
		'__type__': 'timestamp'
	});

	// Check for true
	test('1 is a valid timestamp', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is a valid timestamp', () => {
		expect(oNode.valid(0)).toBe(true);
	});

	// Check for false
	test('-1 is not a valid timestamp', () => {
		expect(oNode.valid(-1)).toBe(false);
	});
	test('"-1" is not a valid timestamp', () => {
		expect(oNode.valid('-1')).toBe(false);
	});
});

// Test 'tuuid' Nodes
describe('tuuid', () => {

	// Create a new basic tuuid Node module
	const oNode = new Node({
		'__type__': 'tuuid'
	});

	// Check for true
	test('"52cd4b20ca32443395160c8684ec57c2" is a valid tuuid', () => {
		expect(oNode.valid('52cd4b20ca32443395160c8684ec57c2')).toBe(true);
	});
	test('"3b44c5ed0fea44789f1b939ae6ec0721" is a valid tuuid', () => {
		expect(oNode.valid('3b44c5ed0fea44789f1b939ae6ec0721')).toBe(true);
	});
	test('"6432b16a7e2747cd836082d82ac70078" is a valid tuuid', () => {
		expect(oNode.valid('6432b16a7e2747cd836082d82ac70078')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid tuuid', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('"Hello" is not a valid tuuid', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('0 is not a valid tuuid', () => {
		expect(oNode.valid(0)).toBe(false);
	});
	test('0.1 is not a valid tuuid', () => {
		expect(oNode.valid(0.1)).toBe(false);
	});
	test('"192.168.0.1" is not a valid tuuid', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid tuuid', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid tuuid', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid tuuid', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('"6432b16a-7e27-47cd-8360-82d82ac70078" is not a valid tuuid', () => {
		expect(oNode.valid('6432b16a-7e27-47cd-8360-82d82ac70078')).toBe(false);
	});
	test('[] is not a valid tuuid', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid tuuid', () => {
		expect(oNode.valid({})).toBe(false);
	});
});

// Test 'uint' Nodes
describe('uint', () => {

	// Create a new basic unsigned int Node module
	const oNode = new Node({
		'__type__': 'uint'
	});

	// Check for true
	test('1 is a valid unsigned int', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('0 is a valid unsigned int', () => {
		expect(oNode.valid(0)).toBe(true);
	});

	// Check for false
	test('-1 is not a valid unsigned int', () => {
		expect(oNode.valid(-1)).toBe(false);
	});
	test('"-1" is not a valid unsigned int', () => {
		expect(oNode.valid('-1')).toBe(false);
	});
});

// Test 'uuid' Nodes
describe('uuid', () => {

	// Create a new basic uuid Node module
	const oNode = new Node({
		'__type__': 'uuid'
	});

	// Check for true
	test('"52cd4b20-ca32-4433-9516-0c8684ec57c2" is a valid uuid', () => {
		expect(oNode.valid('52cd4b20-ca32-4433-9516-0c8684ec57c2')).toBe(true);
	});
	test('"3b44c5ed-0fea-4478-9f1b-939ae6ec0721" is a valid uuid', () => {
		expect(oNode.valid('3b44c5ed-0fea-4478-9f1b-939ae6ec0721')).toBe(true);
	});
	test('"6432b16a-7e27-47cd-8360-82d82ac70078" is a valid uuid', () => {
		expect(oNode.valid('6432b16a-7e27-47cd-8360-82d82ac70078')).toBe(true);
	});

	// Check for false
	test('"Hello" is not a valid uuid', () => {
		expect(oNode.valid('Hello')).toBe(false);
	});
	test('"Hello" is not a valid uuid', () => {
		expect(oNode.valid(true)).toBe(false);
	});
	test('0 is not a valid uuid', () => {
		expect(oNode.valid(0)).toBe(false);
	});
	test('0.1 is not a valid uuid', () => {
		expect(oNode.valid(0.1)).toBe(false);
	});
	test('"192.168.0.1" is not a valid uuid', () => {
		expect(oNode.valid('192.168.0.1')).toBe(false);
	});
	test('"2016-03-05" is not a valid uuid', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"13:50:00" is not a valid uuid', () => {
		expect(oNode.valid('13:50:00')).toBe(false);
	});
	test('"2016-03-05 13:50:00" is not a valid uuid', () => {
		expect(oNode.valid('2016-03-05 13:50:00')).toBe(false);
	});
	test('"6432b16a7e2747cd836082d82ac70078" is not a valid uuid', () => {
		expect(oNode.valid('6432b16a7e2747cd836082d82ac70078')).toBe(false);
	});
	test('[] is not a valid uuid', () => {
		expect(oNode.valid([])).toBe(false);
	});
	test('{} is not a valid uuid', () => {
		expect(oNode.valid({})).toBe(false);
	});
});