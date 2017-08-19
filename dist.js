'use strict';

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sizes) {
  return function (property) {
    return function (val) {
      if (!property) {
        throw new Error('You must provide a property');
      }

      if (!val) {
        throw new Error('You must provide a value');
      }

      if (!sizes) {
        return (0, _defineProperty3.default)({}, property, val);
      }

      if (!Array.isArray(val)) {
        return (0, _defineProperty3.default)({}, property, val);
      }

      if ((0, _keys2.default)(sizes).length + 1 < val.length) {
        throw new Error('You provided more values than sizes');
      }

      var entries = (0, _entries2.default)(sizes);

      return val.reduce(function (acc, size, i) {
        if (typeof val[i] === 'undefined' || val[i] === null || val[i] === false) {
          return acc;
        }
        if (i === 0) {
          return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, property, val[i]));
        }
        return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, '@media (' + entries[i - 1][1] + ')', (0, _defineProperty3.default)({}, property, val[i])));
      }, {});
    };
  };
};
