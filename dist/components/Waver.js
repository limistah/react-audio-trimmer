"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _peaks = _interopRequireDefault(require("../libs/peaks"));

var _classnames = _interopRequireDefault(require("classnames"));

var dpr = window.devicePixelRatio || 1;

var Waver =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(Waver, _PureComponent);

  /** @type {CanvasRenderingContext2D} */
  function Waver(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Waver);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Waver).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ctx", null);
    _this.state = {
      peaks: null
    };
    return _this;
  }

  (0, _createClass2["default"])(Waver, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setPeaks(this.props.audioBuffer.getChannelData(0));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvas = this.refs.canvas;
      var ctx = canvas.getContext("2d");
      this.ctx = ctx;
      this.repaint();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.audioBuffer !== nextProps.audioBuffer) {
        this.setPeaks(nextProps.audioBuffer);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.repaint();
    }
  }, {
    key: "setPeaks",
    value: function setPeaks(channelData) {
      console.time("peaks");
      var peaks = (0, _peaks["default"])(this.props.width * dpr, channelData);
      console.timeEnd("peaks");
      this.setState({
        peaks: peaks
      });
    }
  }, {
    key: "repaint",
    value: function repaint() {
      var ctx = this.ctx;
      var peaks = this.state.peaks;
      var count = peaks.length;
      var height = this.props.height;
      var centerY = this.props.height / 2 * dpr;
      ctx.lineWidth = 1;
      ctx.clearRect(0, 0, this.props.width * dpr, this.props.height * dpr);

      for (var i = 0; i < count; i++) {
        var _peaks$i = (0, _slicedToArray2["default"])(peaks[i], 2),
            min = _peaks$i[0],
            max = _peaks$i[1];

        var x = i - 0.5;
        ctx.beginPath();
        ctx.strokeStyle = this.props.color1;
        ctx.moveTo(x, (min + 1) * height + 0.5);
        ctx.lineTo(x, centerY);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = this.props.color2;
        ctx.moveTo(x, centerY);
        ctx.lineTo(x, (max + 1) * height + 0.5);
        ctx.stroke();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("canvas", {
        ref: "canvas",
        className: (0, _classnames["default"])("wave-canvas", this.props.className),
        style: {
          width: this.props.width + "px",
          height: this.props.height + "px"
        },
        width: this.props.width * dpr,
        height: this.props.height * dpr
      });
    }
  }]);
  return Waver;
}(_react.PureComponent);

exports["default"] = Waver;
(0, _defineProperty2["default"])(Waver, "defaultProps", {
  color1: "#ccc",
  color2: "#ddd"
});
(0, _defineProperty2["default"])(Waver, "propTypes", {
  className: _propTypes["default"].string,
  autioBuffer: _propTypes["default"].instanceOf(AudioBuffer),
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  color1: _propTypes["default"].string,
  color2: _propTypes["default"].string
});