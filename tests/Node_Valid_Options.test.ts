import { describe, expect, test } from '@jest/globals';
import { Decimal, Node } from '../';

// Test 'base64' Nodes
describe('base64', () => {

	// Create a new basic base64 Node module
	const oNode = new Node({
		__type__: 'base64',
		__options__: ['SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==', 'WW8gWW8gWW8=', 'RG92ZXRhaWwgaXMgdGhlIHNoaXQu']
	});

	// Check for True
	test('"SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==" is in ["SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==", "WW8gWW8gWW8=", "RG92ZXRhaWwgaXMgdGhlIHNoaXQu"]', () => {
		expect(oNode.valid('SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==')).toBe(true);
	});
	test('"WW8gWW8gWW8=" is in ["SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==", "WW8gWW8gWW8=", "RG92ZXRhaWwgaXMgdGhlIHNoaXQu"]', () => {
		expect(oNode.valid('WW8gWW8gWW8=')).toBe(true);
	});
	test('"RG92ZXRhaWwgaXMgdGhlIHNoaXQu" is in ["SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==", "WW8gWW8gWW8=", "RG92ZXRhaWwgaXMgdGhlIHNoaXQu"]', () => {
		expect(oNode.valid('RG92ZXRhaWwgaXMgdGhlIHNoaXQu')).toBe(true);
	});

	// Check for False
	test('"SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==" is not in ["SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==", "WW8gWW8gWW8=", "RG92ZXRhaWwgaXMgdGhlIHNoaXQu"]', () => {
		expect(oNode.valid('SPVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==')).toBe(false);
	});
	test('"WW8gWW8gWW8===" is not in ["SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==", "WW8gWW8gWW8=", "RG92ZXRhaWwgaXMgdGhlIHNoaXQu"]', () => {
		expect(oNode.valid('WW8gWW8gWW8===')).toBe(false);
	});
	test('"RG92ZXRhaWwgaXMgdGhlIHNo" is not in ["SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IQ==", "WW8gWW8gWW8=", "RG92ZXRhaWwgaXMgdGhlIHNoaXQu"]', () => {
		expect(oNode.valid('RG92ZXRhaWwgaXMgdGhlIHNo')).toBe(false);
	});
});

// Test 'date' Nodes
describe('date', () => {

	// Create a new options date Node module
	const oNode = new Node({
		__type__: 'date',
		__options__: ['2016-03-06', '2016-03-07', '2016-03-08']
	});

	// Check for True
	test('"2016-03-06" is in ["2016-03-06", "2016-03-07", "2016-03-08"]', () => {
		expect(oNode.valid('2016-03-06')).toBe(true);
	});
	test('"2016-03-07" is in ["2016-03-06", "2016-03-07", "2016-03-08"]', () => {
		expect(oNode.valid('2016-03-07')).toBe(true);
	});
	test('"2016-03-08" is in ["2016-03-06", "2016-03-07", "2016-03-08"]', () => {
		expect(oNode.valid('2016-03-08')).toBe(true);
	});

	// Check for True
	test('"2016-03-05" is not in ["2016-03-06", "2016-03-07", "2016-03-08"]', () => {
		expect(oNode.valid('2016-03-05')).toBe(false);
	});
	test('"2016-03-09" is not in ["2016-03-06", "2016-03-07", "2016-03-08"]', () => {
		expect(oNode.valid('2016-03-09')).toBe(false);
	});
	test('"2015-03-07" is not in ["2016-03-06", "2016-03-07", "2016-03-08"]', () => {
		expect(oNode.valid('2015-03-07')).toBe(false);
	});
});

// Test 'datetime' Nodes
describe('datetime', () => {

	// Create a new options datetime Node module
	const oNode = new Node({
		__type__: 'datetime',
		__options__: ['2016-03-06 02:00:00', '2016-03-07 00:02:00', '2016-03-08 00:00:02']
	});

	// Check for True
	test('"2016-03-06 02:00:00" is in ["2016-03-06 02:00:00", "2016-03-07 00:02:00", "2016-03-08 00:00:02"]', () => {
		expect(oNode.valid('2016-03-06 02:00:00')).toBe(true);
	});
	test('"2016-03-07 00:02:00" is in ["2016-03-06 02:00:00", "2016-03-07 00:02:00", "2016-03-08 00:00:02"]', () => {
		expect(oNode.valid('2016-03-07 00:02:00')).toBe(true);
	});
	test('"2016-03-08 00:00:02" is in ["2016-03-06 02:00:00", "2016-03-07 00:02:00", "2016-03-08 00:00:02"]', () => {
		expect(oNode.valid('2016-03-08 00:00:02')).toBe(true);
	});

	// Check for True
	test('"2016-03-05 02:00:00" is not in ["2016-03-06 02:00:00", "2016-03-07 00:02:00", "2016-03-08 00:00:02"]', () => {
		expect(oNode.valid('2016-03-05 02:00:00')).toBe(false);
	});
	test('"2016-03-09 00:02:00" is not in ["2016-03-06 02:00:00", "2016-03-07 00:02:00", "2016-03-08 00:00:02"]', () => {
		expect(oNode.valid('2016-03-09 00:02:00')).toBe(false);
	});
	test('"2015-03-07 00:00:02" is not in ["2016-03-06 02:00:00", "2016-03-07 00:02:00", "2016-03-08 00:00:02"]', () => {
		expect(oNode.valid('2015-03-07 00:00:02')).toBe(false);
	});
});

// Test 'decimal' Nodes
describe('decimal', () => {

	// Create a new options decimal Node module
	const oNode = new Node({
		__type__: 'decimal',
		__options__: [new Decimal('0.0'), '2.0', new Decimal('123.345'), '0.6']
	});

	// Check for True
	test('0.0 is in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('0.0'))).toBe(true);
	});
	test('2.0 is in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('2.0'))).toBe(true);
	});
	test('123.345 is in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('123.345'))).toBe(true);
	});
	test(' is in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('0.6'))).toBe(true);
	});

	// Check for False
	test('0 is not in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('1'))).toBe(false);
	});
	test('2.1 is not in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('2.1'))).toBe(false);
	});
	test('123.45 is not in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('123.45'))).toBe(false);
	});
	test('0.06 is not in [0.0, 2.0, 123.345, 0.6]', () => {
		expect(oNode.valid(new Decimal('0.06'))).toBe(false);
	});
});

// Test 'int' Nodes
describe('int', () => {

	// Create a new options int Node module
	const oNode = new Node({
		__type__: 'int',
		__options__: [-1, 0, 2, 4]
	});

	// Check for True
	test('-1 is in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(-1)).toBe(true);
	});
	test('0 is in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('2 is in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(2)).toBe(true);
	});
	test('4 is in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(4)).toBe(true);
	});

	// Check for False
	test('1 is not in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(1)).toBe(false);
	});
	test('-2 is not in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(-2)).toBe(false);
	});
	test('3 is not in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(3)).toBe(false);
	});
	test('-100 is not in [-1, 0, 2, 4]', () => {
		expect(oNode.valid(-100)).toBe(false);
	});
});

// Test 'ip' Nodes
describe('ip', () => {

	// Create a new options ip Node module
	const oNode = new Node({
		__type__: 'ip',
		__options__: ['10.0.0.1', '192.168.0.1', '127.0.0.1']
	});

	// Check for True
	test('"10.0.0.1" is in ["10.0.0.1", "192.168.0.1", "127.0.0.1"]', () => {
		expect(oNode.valid('10.0.0.1')).toBe(true);
	});
	test('"192.168.0.1" is in ["10.0.0.1", "192.168.0.1", "127.0.0.1"]', () => {
		expect(oNode.valid('192.168.0.1')).toBe(true);
	});
	test('"127.0.0.1" is in ["10.0.0.1", "192.168.0.1", "127.0.0.1"]', () => {
		expect(oNode.valid('127.0.0.1')).toBe(true);
	});

	// Check for False
	test('"11.0.0.1" is not in ["10.0.0.1", "192.168.0.1", "127.0.0.1"]', () => {
		expect(oNode.valid('11.0.0.1')).toBe(false);
	});
	test('"192.169.1.1" is not in ["10.0.0.1", "192.168.0.1", "127.0.0.1"]', () => {
		expect(oNode.valid('192.169.1.1')).toBe(false);
	});
	test('"0.0.0.0" is not in ["10.0.0.1", "192.168.0.1", "127.0.0.1"]', () => {
		expect(oNode.valid('0.0.0.0')).toBe(false);
	});
});

// Test 'md5' Nodes
describe('md5', () => {

	// Create a new options md5 Node module
	const oNode = new Node({
		__type__: 'md5',
		__options__: ['7b967af699a0a18b1f2bdc9704537a3e', '889ffd8cc409445187c4258d138192b6', '49c0d2aef0ab2634b0051544cdbf2415']
	});

	// Check for True
	test('"7b967af699a0a18b1f2bdc9704537a3e" is in ["7b967af699a0a18b1f2bdc9704537a3e", "889ffd8cc409445187c4258d138192b6", "49c0d2aef0ab2634b0051544cdbf2415"]', () => {
		expect(oNode.valid('7b967af699a0a18b1f2bdc9704537a3e')).toBe(true);
	});
	test('"889ffd8cc409445187c4258d138192b6" is in ["7b967af699a0a18b1f2bdc9704537a3e", "889ffd8cc409445187c4258d138192b6", "49c0d2aef0ab2634b0051544cdbf2415"]', () => {
		expect(oNode.valid('889ffd8cc409445187c4258d138192b6')).toBe(true);
	});
	test('"49c0d2aef0ab2634b0051544cdbf2415" is in ["7b967af699a0a18b1f2bdc9704537a3e", "889ffd8cc409445187c4258d138192b6", "49c0d2aef0ab2634b0051544cdbf2415"]', () => {
		expect(oNode.valid('49c0d2aef0ab2634b0051544cdbf2415')).toBe(true);
	});

	// Check for False
	test('"49c0d2aef0ab2634b1051544cdbf2415" is not in ["7b967af699a0a18b1f2bdc9704537a3e", "889ffd8cc409445187c4258d138192b6", "49c0d2aef0ab2634b0051544cdbf2415"]', () => {
		expect(oNode.valid('49c0d2aef0ab2634b1051544cdbf2415')).toBe(false);
	});
	test('"889ffd8cc409445287c4258d138192b6" is not in ["7b967af699a0a18b1f2bdc9704537a3e", "889ffd8cc409445187c4258d138192b6", "49c0d2aef0ab2634b0051544cdbf2415"]', () => {
		expect(oNode.valid('889ffd8cc409445287c4258d138192b6')).toBe(false);
	});
	test('"49c0d2aee0ab2634b0051544cdbf2415" is not in ["7b967af699a0a18b1f2bdc9704537a3e", "889ffd8cc409445187c4258d138192b6", "49c0d2aef0ab2634b0051544cdbf2415"]', () => {
		expect(oNode.valid('49c0d2aee0ab2634b0051544cdbf2415')).toBe(false);
	});
});

// Test 'string' Nodes
describe('string', () => {

	// Create a new options string Node module
	const oNode = new Node({
		__type__: 'string',
		__options__: ['hello', 'there', 'my', '00000']
	});

	// Check for True
	test('"hello" is in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('hello')).toBe(true);
	});
	test('"there" is in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('there')).toBe(true);
	});
	test('"my" is in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('my')).toBe(true);
	});
	test('"00000" is in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('00000')).toBe(true);
	});

	// Check for False
	test('"49c0d2aef0ab2634b1051544cdbf2415" is not in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('49c0d2aef0ab2634b1051544cdbf2415')).toBe(false);
	});
	test('"889ffd8cc409445287c4258d138192b6" is not in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('889ffd8cc409445287c4258d138192b6')).toBe(false);
	});
	test('"49c0d2aee0ab2634b0051544cdbf2415" is not in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('49c0d2aee0ab2634b0051544cdbf2415')).toBe(false);
	});
	test('"00000" is not in ["hello", "there", "my", "00000"]', () => {
		expect(oNode.valid('0000')).toBe(false);
	});
});

// Test 'time' Nodes
describe('time', () => {

	// Create a new options time Node module
	const oNode = new Node({
		__type__: 'time',
		__options__: ['12:00:12', '00:00:00', '12:23:00']
	});

	// Check for True
	test('"12:00:12" is in ["12:00:12", "00:00:00", "12:23:00"]', () => {
		expect(oNode.valid('12:00:12')).toBe(true);
	});
	test('"00:00:00" is in ["12:00:12", "00:00:00", "12:23:00"]', () => {
		expect(oNode.valid('00:00:00')).toBe(true);
	});
	test('"12:23:00" is in ["12:00:12", "00:00:00", "12:23:00"]', () => {
		expect(oNode.valid('12:23:00')).toBe(true);
	});

	// Check for True
	test('"00:12:00" is not in ["12:00:12", "00:00:00", "12:23:00"]', () => {
		expect(oNode.valid('00:12:00')).toBe(false);
	});
	test('"23:59:59" is not in ["12:00:12", "00:00:00", "12:23:00"]', () => {
		expect(oNode.valid('23:59:59')).toBe(false);
	});
	test('"00:12:23" is not in ["12:00:12", "00:00:00", "12:23:00"]', () => {
		expect(oNode.valid('00:12:23')).toBe(false);
	});
});

// Test 'timestamp' Nodes
describe('timestamp', () => {

	// Create a new options timestamp Node module
	const oNode = new Node({
		__type__: 'timestamp',
		__options__: [0, 1, 2, 3]
	});

	// Check for True
	test('0 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('1 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('2 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(2)).toBe(true);
	});
	test('3 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(3)).toBe(true);
	});

	// Check for False
	test('4 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(4)).toBe(false);
	});
	test('-2 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(-2)).toBe(false);
	});
	test('10000 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(10000)).toBe(false);
	});
	test('-100 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(-100)).toBe(false);
	});
});

// Test 'uint' Nodes
describe('uint', () => {

	// Create a new options uint Node module
	const oNode = new Node({
		__type__: 'uint',
		__options__: [0, 1, 2, 3]
	});

	// Check for True
	test('0 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(0)).toBe(true);
	});
	test('1 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(1)).toBe(true);
	});
	test('2 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(2)).toBe(true);
	});
	test('3 is in [0, 1, 2, 3]', () => {
		expect(oNode.valid(3)).toBe(true);
	});

	// Check for False
	test('4 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(4)).toBe(false);
	});
	test('-2 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(-2)).toBe(false);
	});
	test('10000 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(10000)).toBe(false);
	});
	test('-100 is not in [0, 1, 2, 3]', () => {
		expect(oNode.valid(-100)).toBe(false);
	});
});