"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _FilePicker = _interopRequireDefault(require("./FilePicker"));

function _default(_ref) {
  var onFileChange = _ref.onFileChange,
      onPauseClick = _ref.onPauseClick,
      paused = _ref.paused,
      onReplayClick = _ref.onReplayClick,
      processing = _ref.processing,
      onEncode = _ref.onEncode,
      showEncodeBtn = _ref.showEncodeBtn;
  return _react["default"].createElement("div", {
    className: "rat-controllers"
  }, _react["default"].createElement(_FilePicker["default"], {
    onChange: onFileChange,
    type: "control"
  }), _react["default"].createElement("a", {
    className: "rat-controller-item",
    title: "Pause",
    onClick: onPauseClick
  }, _react["default"].createElement(_Icon["default"], {
    name: paused ? "play" : "pause"
  })), _react["default"].createElement("a", {
    className: "rat-controller-item",
    title: "Replay",
    onClick: onReplayClick
  }, _react["default"].createElement(_Icon["default"], {
    name: "replay"
  })), !showEncodeBtn && _react["default"].createElement("div", {
    className: "rat-controller-dropdown rat-controller-list-wrap"
  }, _react["default"].createElement("a", {
    className: "rat-controller-item",
    onClick: onEncode,
    "data-type": "wav"
  }, _react["default"].createElement(_Icon["default"], {
    name: processing ? "spin" : "download"
  }))));
}