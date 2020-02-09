'use strict';

/**
 * Check if first letter is '.' and next are alphabetic or numeric ones or nothing except '.'
 *
 * @const {RegExp[]}
 * @todo Improve the rule (maybe not to use RegExp?)
 */

const REGEX_ARR = [
    RegExp('[.]'),
    RegExp('^\.\w+'),
    RegExp('^\.\d+')
];

/**
 * Get an object and path to the object's property and return its value (or undefined if property doesn't exist)
 *
 * @author Sergey Malyshev
 * @see https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
 * @see https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
 * @param {Object} object - An object param
 * @param {String} prop - A path to the object's property
 * @return {String} Object's property value
 *
 * @example
 *
 *  get({
        foo: 'bar',
        deep: {
            hested: {
                field: 'baz'
            }
        }
    }, '.foo')
 */

const get = (object, prop) =>
    regexArr.some(regex => regex.test(prop)) && Object.prototype.toString.call(object) === '[object Object]' ?
        prop.split('.')
            .slice(1)
            .reduce((subObject, propValue) => 
                        (subObject && subObject[propValue]) ? subObject[propValue] : (!propValue) ? object : undefined,
                    object)
        : undefined;
