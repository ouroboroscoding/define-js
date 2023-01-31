/**
 * Types
 *
 * Holds various strings and regexes for valid types
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2019-03-01
 */
declare const types: {
    array: string[];
    nodes: string[];
    special: {
        syntax: string;
        key: RegExp;
        name: RegExp;
        reserved: string[];
    };
    standard: RegExp;
    regex: {
        base64: RegExp;
        date: RegExp;
        datetime: RegExp;
        decimal: RegExp;
        int: RegExp;
        ip: RegExp;
        md5: RegExp;
        price: RegExp;
        time: RegExp;
        uuid: RegExp;
        uuid4: RegExp;
    };
};
export default types;
