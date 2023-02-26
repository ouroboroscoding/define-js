import { describe, expect, test } from '@jest/globals';
import { Node } from '../src/';

// Test 'string' Nodes
describe('string one', () => {

	// Create a new options any Node module
	const oNode = new Node({
		__type__: 'string',
		__regex__: /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/
	});

	// Check for True
	test('"2016-03-05" is in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('2016-03-05')).toBe(true);
	});
	test('"2020-12-25" is in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('2020-12-25')).toBe(true);
	});
	test('"1970-01-01" is in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('1970-01-01')).toBe(true);
	});

	// Check for False
	test('"70-01-01" is not in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('70-01-01')).toBe(false);
	});
	test('"10000-01-01" is not in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('10000-01-01')).toBe(false);
	});
	test('"1970-00-01" is not in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('1970-00-01')).toBe(false);
	});
	test('"2000-12-00" is not in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('2000-12-00')).toBe(false);
	});
	test('"2000-12-32" is not in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('2000-12-32')).toBe(false);
	});
	test('"2000-13-10" is not in /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/', () => {
		expect(oNode.valid('2000-13-10')).toBe(false);
	});
});

// Test 'string' Nodes
describe('string two', () => {

	// Create a new options any Node module
	const oNode = new Node({
		__type__: 'string',
		__regex__: /^(?:hello|there|my|friend)$/
	});

	// Check for True
	test('"hello" is in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('hello')).toBe(true);
	});
	test('"there" is in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('there')).toBe(true);
	});
	test('"my" is in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('my')).toBe(true);
	});
	test('"friend" is in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('friend')).toBe(true);
	});

	// Check for False
	test('"suck it" is not in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('suck it')).toBe(false);
	});
	test('"HELLO" is not in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('HELLO')).toBe(false);
	});
	test('"WhatWhat" is not in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('WhatWhat')).toBe(false);
	});
	test('"2309 r gjvhjw0e9f" is not in /^(?:hello|there|my|friend)$/', () => {
		expect(oNode.valid('2309 r gjvhjw0e9f')).toBe(false);
	});
});