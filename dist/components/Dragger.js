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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var Dragger =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(Dragger, _PureComponent);

  function Dragger() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Dragger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Dragger)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_screenX", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_screenY", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_ox", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_oy", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleMouseDown", function (e) {
      _this._screenX = e.screenX;
      _this._screenY = e.screenY;
      _this._ox = _this.props.x;
      _this._oy = _this.props.y;
      window.addEventListener("mousemove", _this.handleMouseMove, false);
      window.addEventListener("mouseup", _this.handleMouseUp, false);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleMouseMove", function (e) {
      _this.props.onDrag({
        x: e.screenX - _this._screenX + _this._ox,
        y: e.screenY - _this._screenY + _this._oy
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleMouseUp", function () {
      window.removeEventListener("mousemove", _this.handleMouseMove);
      window.removeEventListener("mouseup", _this.handleMouseUp);
    });
    return _this;
  }

  (0, _createClass2["default"])(Dragger, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])("rat-dragger", this.props.className),
        onMouseDown: this.handleMouseDown,
        style: {
          left: this.props.x + "px",
          top: this.props.y + "px"
        }
      }, this.props.children);
    }
  }]);
  return Dragger;
}(_react.PureComponent);

exports["default"] = Dragger;
(0, _defineProperty2["default"])(Dragger, "defaultProps", {
  onDrag: function onDrag() {},
  x: 0,
  y: 0
});
(0, _defineProperty2["default"])(Dragger, "propTypes", {
  x: _propTypes["default"].number,
  y: _propTypes["default"].number,
  onDrag: _propTypes["default"].func,
  className: _propTypes["default"].string,
  children: _propTypes["default"].element
});