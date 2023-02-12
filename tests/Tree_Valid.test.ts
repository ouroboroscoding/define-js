import { describe, expect, test } from '@jest/globals';
import { Parent, Tree } from '../';

describe('Tree Valid', () => {

	// Build a Tree
	const o = new Tree({__name__:"hello","field1":{__type__:"uint"},"field2":{"field2_1":{__type__:"string","__regex__":"^\\S+$"},"field2_2":{__type__:"uint","__options__":[0,1,2,34]}},"field3":{__array__:"unique",__type__:"decimal"},"field4":{__array__:"duplicates","field4_1":{__type__:"md5"},"field4_2":{"field4_2_1":{__type__:"date"}}}})

	// Check for True
	test('"Hello" is a valid value for hello.field2.field2_1', () => {
		expect((o.get('field2') as Parent).get('field2_1').valid('Hello')).toBe(true);
	});
	test('{"field2_1":"Hello","field2_2":34} is a valid value for hello.field2', () => {
		expect(o.get('field2').valid({"field2_1":"Hello","field2_2":34})).toBe(true);
	})
	test('{"field1":2,"field2":{"field2_1":"ThisString","field2_2":34},"field3":[0.3,10.3,20.3],"field4":[{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"},},{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"}}]} is a valid value for hello', () => {
		expect(o.valid({"field1":2,"field2":{"field2_1":"ThisString","field2_2":34},"field3":[0.3,10.3,20.3],"field4":[{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"},},{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"}}]})).toBe(true);
	});

	// Check for False
	test('"    " is not a valid value for hello.field2.field2_1', () => {
		expect((o.get('field2') as Parent).get('field2_1').valid('    ')).toBe(false);
		expect((o.get('field2') as Parent).get('field2_1').validationFailures[0][0]).toBe('');
		expect((o.get('field2') as Parent).get('field2_1').validationFailures[0][1]).toBe('failed regex (custom)');
	});
	test('{"field2_1":"Hello","field2_2":4} is not a valid value for hello.field2', () => {
		expect(o.get('field2').valid({"field2_1":"Hello","field2_2":4})).toBe(false);
		expect(o.get('field2').validationFailures[0][0]).toBe('field2_2');
		expect(o.get('field2').validationFailures[0][1]).toBe('not in options');
	});
	test('{"field2_1":"   ","field2_2":2} is not a valid value for hello.field2', () => {
		expect(o.get('field2').valid({"field2_1":"   ","field2_2":2})).toBe(false);
		expect(o.get('field2').validationFailures[0][0]).toBe('field2_1');
		expect(o.get('field2').validationFailures[0][1]).toBe('failed regex (custom)');
	});
	test('{"field1":"NotAnINTEGER","field2":{"field2_1":"ThisString","field2_2":34},"field3":[0.3,10.3,20.3],"field4":[{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"},},{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"}}]} is not a valid value for hello', () => {
		expect(o.valid({"field1":"NotAnINTEGER","field2":{"field2_1":"ThisString","field2_2":34},"field3":[0.3,10.3,20.3],"field4":[{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"},},{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"}}]})).toBe(false);
		expect(o.validationFailures[0][0]).toBe('hello.field1');
		expect(o.validationFailures[0][1]).toBe('not an integer');
	});
	test('{"field1":"NotAnINTEGER","field2":{"field2_1":"ThisString","field2_2":34},"field3":[0.3,10.3,20.3],"field4":[{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"},},{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"}}]} is not a valid value for hello', () => {
		expect(o.valid({"field1":"NotAnINTEGER","field2":{"field2_1":"This String","field2_2":3},"field3":[0.3,10.3,20.3],"field4":[{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"},},{"field4_1":"49c0d2aef0ab2634b0051544cdbf2415","field4_2":{"field4_2_1":"2016-03-05"}}]})).toBe(false);
		expect(o.validationFailures[0][0]).toBe('hello.field1');
		expect(o.validationFailures[0][1]).toBe('not an integer');
		expect(o.validationFailures[1][0]).toBe('hello.field2.field2_1');
		expect(o.validationFailures[1][1]).toBe('failed regex (custom)');
		expect(o.validationFailures[2][0]).toBe('hello.field2.field2_2');
		expect(o.validationFailures[2][1]).toBe('not in options');
	});
});