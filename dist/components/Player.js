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

var _Waver = _interopRequireDefault(require("./Waver"));

var _Dragger = _interopRequireDefault(require("./Dragger"));

var _webAudio = _interopRequireDefault(require("../libs/webAudio"));

var _utils = require("../libs/utils");

var _color = _interopRequireDefault(require("color"));

var containerWidth = 1000;
var containerHeight = 160;

function getClipRect(start, end) {
  return "rect(0, ".concat(end, "px, ").concat(containerHeight, "px, ").concat(start, "px)");
}

var color1 = "#0cf";
var color2 = (0, _color["default"])(color1).lighten(0.1).toString();
var gray1 = "#ddd";
var gray2 = "#e3e3e3";

var Player =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(Player, _PureComponent);

  function Player() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Player);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Player)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "currentTime", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "audioBuffer", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onAudioProcess", function (current) {
      if (_this.props.currentTime < _this.props.endTime && current >= _this.props.endTime) {
        _this.props.onCurrentTimeChange(_this.props.startTime || 0);
      } else {
        _this.currentTime = current;

        _this.props.onCurrentTimeChange(current);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onAudioProcessEnd", function () {
      _this.props.onCurrentTimeChange(_this.props.startTime || 0);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "withinTimeLimit", function (time) {
      var isDragEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var timeLimit = _this.props.timeLimit;
      var startTime = _this.props.startTime;
      var endTime = time;

      if (!isDragEnd) {
        startTime = time;
        endTime = _this.props.endTime;
      }

      var duration = _this.props.audioBuffer.duration;
      var timeTillEnd = duration - endTime;
      var currentRange = duration - startTime - timeTillEnd;
      return timeLimit ? currentRange <= timeLimit : true;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "withinTimeRange", function (time) {
      var isDragEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var timeRange = _this.props.timeRange;
      var interval = time - _this.props.startTime;

      if (!isDragEnd) {
        interval = _this.props.endTime - time;
      }

      return timeRange ? interval >= timeRange : true;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dragEnd", function (pos) {
      var pos2Time = _this.pos2Time(_this.keepInRange(pos.x));

      var time = pos2Time;
      var endTime = _this.props.endTime;
      var currentTime = _this.props.currentTime;

      var currentTimeIsWithinLimit = _this.withinTimeLimit(time);

      var currentTimeIsWithinRange = _this.withinTimeRange(time);

      if (currentTime >= endTime || !currentTimeIsWithinRange || !currentTimeIsWithinLimit) {
        time = endTime;

        _this.audio.pause();
      }

      _this.props.onEndTimeChange(time);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dragCurrent", function (pos) {
      var pos2Time = _this.pos2Time(_this.keepInRange(pos.x));

      var time = pos2Time;
      var endTime = _this.props.endTime;
      var startTime = _this.props.startTime;
      var currentTime = _this.props.currentTime; // Must not be greater to the ending

      if (time >= endTime || time <= startTime) {
        time = currentTime;

        _this.audio.pause();
      }

      _this.props.onCurrentTimeChange(time);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dragStart", function (pos) {
      var pos2Time = _this.pos2Time(_this.keepInRange(pos.x));

      var time = pos2Time;
      var currentTime = _this.props.currentTime;

      var currentTimeIsWithinRange = _this.withinTimeRange(time, false);

      var currentTimeIsWithinLimit = _this.withinTimeLimit(time, false); // Restricts till the current time


      if (time >= currentTime || !currentTimeIsWithinRange || !currentTimeIsWithinLimit) {
        time = _this.props.startTime;

        _this.audio.pause();
      }

      _this.props.onStartTimeChange(time);
    });
    return _this;
  }

  (0, _createClass2["default"])(Player, [{
    key: "clean",
    value: function clean() {
      var audio = this.audio;
      audio && audio.destroy();
    }
  }, {
    key: "initWebAudio",
    value: function initWebAudio() {
      this.clean();
      var audioBuffer = this.props.audioBuffer;
      var audio = new _webAudio["default"](audioBuffer);
      audio.on("process", this.onAudioProcess);
      audio.on("end", this.onAudioProcessEnd);

      if (!this.props.paused) {
        audio.play(this.props.currentTime);
      }

      this.audio = audio;
    }
  }, {
    key: "keepInRange",
    value: function keepInRange(x) {
      if (x < 0) {
        return 0;
      }

      if (x > containerWidth) {
        return containerWidth;
      }

      return x;
    }
  }, {
    key: "pos2Time",
    value: function pos2Time(pos) {
      return pos / this.widthDurationRatio;
    }
  }, {
    key: "time2pos",
    value: function time2pos(time) {
      return time * this.widthDurationRatio;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // 如果 paused 状态改变
      if (prevProps.paused !== this.props.paused) {
        if (this.props.paused) {
          this.audio.pause();
        } else {
          this.audio.play(this.props.currentTime);
        }
      } // 如果 currentTime 改变（传入的和上次 onChange 的不同），从改变处播放


      if (!this.props.paused && this.currentTime !== this.props.currentTime) {
        this.audio.play(this.props.currentTime);
      }

      if (this.props.audioBuffer !== prevProps.audioBuffer) {
        this.initWebAudio();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initWebAudio();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clean();
    }
  }, {
    key: "renderTimestamp",
    value: function renderTimestamp() {
      var formated = (0, _utils.formatSeconds)(this.props.currentTime);
      return _react["default"].createElement("div", {
        className: "rat-player-cursor-current"
      }, _react["default"].createElement("span", {
        className: "rat-player-num"
      }, formated[0]), "'", _react["default"].createElement("span", {
        className: "rat-player-num"
      }, formated[1]), ".", _react["default"].createElement("span", {
        className: "rat-player-num"
      }, (0, _utils.leftZero)(formated[2], 2)));
    }
  }, {
    key: "render",
    value: function render() {
      var start = this.time2pos(this.props.startTime);
      var end = this.time2pos(this.props.endTime);
      var current = this.time2pos(this.props.currentTime);
      return _react["default"].createElement("div", {
        className: "rat-player"
      }, _react["default"].createElement("div", {
        className: "rat-player-clipper"
      }, _react["default"].createElement(_Waver["default"], {
        audioBuffer: this.props.audioBuffer,
        width: containerWidth,
        height: containerHeight,
        color1: gray1,
        color2: gray2
      })), _react["default"].createElement("div", {
        className: "rat-player-clipper",
        style: {
          clip: getClipRect(start, end)
        }
      }, _react["default"].createElement(_Waver["default"], {
        audioBuffer: this.props.audioBuffer,
        width: containerWidth,
        height: containerHeight,
        color1: color1,
        color2: color2
      })), _react["default"].createElement(_Dragger["default"], {
        x: start,
        onDrag: this.dragStart
      }), _react["default"].createElement(_Dragger["default"], {
        className: "rat-player-drag-current",
        x: current,
        onDrag: this.dragCurrent
      }, this.renderTimestamp()), _react["default"].createElement(_Dragger["default"], {
        x: end,
        onDrag: this.dragEnd
      }));
    }
  }, {
    key: "widthDurationRatio",
    get: function get() {
      return containerWidth / this.props.audioBuffer.duration;
    }
  }]);
  return Player;
}(_react.PureComponent);

exports["default"] = Player;
(0, _defineProperty2["default"])(Player, "propTypes", {
  encoding: _propTypes["default"].bool,
  audioBuffer: _propTypes["default"].instanceOf(AudioBuffer),
  paused: _propTypes["default"].bool,
  startTime: _propTypes["default"].number,
  endTime: _propTypes["default"].number,
  currentTime: _propTypes["default"].number,
  timeLimit: _propTypes["default"].number,
  timeRange: _propTypes["default"].number,
  onStartTimeChange: _propTypes["default"].func,
  onEndTimeChange: _propTypes["default"].func,
  onCurrentTimeChange: _propTypes["default"].func
});