"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MetaInfo;

var _react = _interopRequireDefault(require("react"));

function MetaInfo(_ref) {
  var secondsRange = _ref.secondsRange,
      duration = _ref.duration,
      startTime = _ref.startTime,
      endTime = _ref.endTime;
  return _react["default"].createElement("span", {
    className: "rat-meta-seconds"
  }, "Select ", _react["default"].createElement("span", {
    className: "rat-meta-seconds-range"
  }, secondsRange), " of", " ", _react["default"].createElement("span", {
    className: "rat-meta-seconds-total"
  }, duration), " (from", " ", _react["default"].createElement("span", {
    className: "rat-meta-seconds-start"
  }, startTime), " to", " ", _react["default"].createElement("span", {
    className: "rat-meta-seconds-end"
  }, endTime), ")");
}