"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("./Icon"));

var FilePicker =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(FilePicker, _PureComponent);

  function FilePicker() {
    var _this;

    (0, _classCallCheck2["default"])(this, FilePicker);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FilePicker).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChange", function () {
      _this.props.onChange(_this.refs.file.files[0]);

      _this.setState({
        key: _this.state.key + 1
      });
    });
    _this.state = {
      key: 0
    };
    return _this;
  }

  (0, _createClass2["default"])(FilePicker, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("label", {
        className: "rat-file-picker"
      }, this.props.type === "control" ? _react["default"].createElement("div", {
        className: "rat-file-picker-control",
        title: "Pick A File"
      }, _react["default"].createElement(_Icon["default"], {
        name: "music"
      })) : _react["default"].createElement("div", {
        className: "rat-file-picker-main"
      }, _react["default"].createElement(_Icon["default"], {
        name: "music"
      }), "Select An Audio File"), _react["default"].createElement("input", {
        type: "file",
        key: this.state.key,
        ref: "file",
        accept: "audio/*",
        onChange: this.handleChange
      }));
    }
  }]);
  return FilePicker;
}(_react.PureComponent);

exports["default"] = FilePicker;
(0, _defineProperty2["default"])(FilePicker, "defaultProps", {
  onChange: function onChange() {}
});
(0, _defineProperty2["default"])(FilePicker, "propTypes", {
  onChange: _propTypes["default"].func,
  children: _propTypes["default"].element
});