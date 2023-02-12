import { describe, expect, test } from '@jest/globals';
import { Tree } from '../';

describe('Tree to JSON', () => {

	// Create the Tree instance
	const o = new Tree({__name__:"hello","field1":{__type__:"uint"},"field2":{"field2_1":{__type__:"string","__regex__":/^\S+$/},"field2_2":{__type__:"uint","__options__":[0,1,2,34]}},"field3":{__array__:"unique",__type__:"decimal"},"field4":{__array__:"duplicates","__ui__":{"ui":"information"},"field4_1":{__type__:"md5"},"field4_2":{"field4_2_1":{__type__:"date","__mysql__":"MySQL information"}}}})

	// Test for true
	let json = '{"__name__":"hello","field1":{"__type__":"uint"},"field2":{"field2_1":{"__type__":"string","__regex__":"^\\\\S+$"},"field2_2":{"__type__":"uint","__options__":[0,1,2,34]}},"field3":{"__array__":"unique","__type__":"decimal"},"field4":{"__array__":"duplicates","__ui__":{"ui":"information"},"field4_1":{"__type__":"md5"},"field4_2":{"field4_2_1":{"__type__":"date","__mysql__":"MySQL information"}}}}';
	test('toJSON', () => {
		expect(o.toJSON()).toBe(json);
	});
});