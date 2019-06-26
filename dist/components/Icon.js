"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require.context("../assets/icons/", false).keys().forEach(function (file) {
  require("../assets/icons/" + file.slice(2));
});

var Icon = function Icon(props) {
  return _react["default"].createElement("svg", {
    className: "rat-icon rat-icon-".concat(props.name)
  }, _react["default"].createElement("use", {
    xlinkHref: "#icon-".concat(props.name)
  }));
};

Icon.propTypes = {
  name: _propTypes["default"].string
};
var _default = Icon;
exports["default"] = _default;