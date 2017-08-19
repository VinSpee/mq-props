"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (sizes) {
  return function (property) {
    return function (val) {
      // Short circuit - if there is no size scale, exit.
      if (!sizes) {
        return val;
      }
      // Short circuit - if the prop isn't an array, exit.
      if (!Array.isArray(val)) {
        return val;
      }

      var entries = Object.entries(sizes);

      return val.reduce(function (acc, size, i) {
        if (i === 0) {
          return _extends({}, acc, _defineProperty({}, property, val[i]));
        }
        return _extends({}, acc, _defineProperty({}, "@media (" + entries[i - 1][1] + ")", _defineProperty({}, property, val[i])));
      }, {});
    };
  };
};
