'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
      if (!sizes) {
        if (!val) {
          return null;
        }

        if (!property) {
          return val;
        }

        return (0, _defineProperty3.default)({}, property, val);
      }

      if (!Array.isArray(val)) {
        if (!val) {
          return null;
        }

        if (!property) {
          return val;
        }

        return (0, _defineProperty3.default)({}, property, val);
      }

      if ((0, _keys2.default)(sizes).length < val.length - 1) {
        throw new Error('You provided more values than sizes:\n\uD83E\uDD21 ' + (0, _keys2.default)(sizes).length + ' sizes.\n\uD83C\uDF0E ' + val.length + ' values. (' + (val.length - 1) + ' including the default value)\n');
      }

      var entries = (0, _entries2.default)(sizes);

      return val.reduce(function (acc, size, i) {
        if (typeof val[i] === 'undefined' || val[i] === null || val[i] === false) {
          return acc;
        }
        if (i === 0) {
          if (!property) {
            return (0, _assign2.default)({}, acc, val[i]);
          }
          return (0, _assign2.default)({}, acc, (0, _defineProperty3.default)({}, property, val[i]));
        }
        if (!property) {
          return (0, _assign2.default)({}, acc, (0, _defineProperty3.default)({}, '@media (' + entries[i - 1][1] + ')', val[i]));
        }
        return (0, _assign2.default)({}, acc, (0, _defineProperty3.default)({}, '@media (' + entries[i - 1][1] + ')', (0, _defineProperty3.default)({}, property, val[i])));
      }, {});
    };
  };
};
