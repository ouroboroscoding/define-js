/**
 * Constants
 *
 * Holds various strings and regexes for valid types
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
// Private values
const specialSyntax = '[a-z0-9_-]+';
// Export the values
const constants = {
    array: ['unique', 'duplicates'],
    nodes: [
        'any', 'base64', 'bool', 'date', 'datetime', 'decimal', 'float', 'int',
        'ip', 'json', 'md5', 'price', 'string', 'time', 'timestamp', 'tuuid',
        'tuuid4', 'uint', 'uuid', 'uuid4'
    ],
    special: {
        syntax: specialSyntax,
        key: new RegExp('^__(' + specialSyntax + ')__$'),
        name: new RegExp('^' + specialSyntax + '$'),
        reserved: [
            '__array__', '__hash__', '__maximum__', '__minimum__', '__name__',
            '__options__', '__regex__', '__require__', '__type__'
        ]
    },
    standard: /^_?[a-zA-Z0-9][a-zA-Z0-9_-]*$/,
    regex: {
        base64: /^(?:[A-Za-z0-9+/]{4})+(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
        date: /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
        datetime: /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0-3])(?::[0-5]\d){2}$/,
        decimal: /^-?(?:[1-9]\d+|\d)(?:\.(\d+))?$/,
        int: /^(?:0|[+-]?[1-9]\d*|0x[0-9a-f]+|0[0-7]+)$/,
        ip: /^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/,
        md5: /^[a-fA-F0-9]{32}$/,
        price: /^-?(?:[1-9]\d+|\d)(?:\.\d{1,2})?$/,
        time: /^(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/,
        tuuid: /^[a-f0-9]{8}[a-f0-9]{4}[a-f0-9]{4}[a-f0-9]{4}[a-f0-9]{12}$/,
        tuuid4: /^[a-f0-9]{8}[a-f0-9]{4}4[a-f0-9]{3}[89aAbB][a-f0-9]{3}[a-f0-9]{12}$/,
        uuid: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        uuid4: /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/
    }
};
export default constants;
