"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("./index.js"));

var Main =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(Main, _PureComponent);

  function Main() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Main);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Main)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleAudioEncode", function (file) {
      console.log(file);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "encodeAudio", function () {
      _this.encoder.encodeAudio();
    });
    return _this;
  }

  (0, _createClass2["default"])(Main, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        className: "page-container"
      }, _react["default"].createElement(_index["default"], {
        timeLimit: 50,
        onAudioEncode: this.handleAudioEncode,
        ref: function ref(el) {
          return _this2.encoder = el;
        }
      }));
    }
  }]);
  return Main;
}(_react.PureComponent);

_reactDom["default"].render(_react["default"].createElement(Main, null), document.getElementById("main"));

module.hot.accept();