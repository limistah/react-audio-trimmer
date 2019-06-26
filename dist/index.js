"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("@mohayonao/web-audio-api-shim");

var _react = _interopRequireWildcard(require("react"));

require("./assets/styles");

var _FilePicker = _interopRequireDefault(require("./components/FilePicker"));

var _utils = require("./libs/utils");

var _audioHelper = require("./libs/audioHelper");

var _webAudio = _interopRequireDefault(require("./libs/webAudio"));

var _DecodingIndicator = _interopRequireDefault(require("./components/DecodingIndicator"));

var _Player = _interopRequireDefault(require("./components/Player"));

var _Icon = _interopRequireDefault(require("./components/Icon"));

var _MetaSecondsInfo = _interopRequireDefault(require("./components/MetaSecondsInfo"));

var _Controllers = _interopRequireDefault(require("./components/Controllers"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _workerClient = require("./libs/workerClient");

var ReactAudioTrimmer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ReactAudioTrimmer, _Component);

  function ReactAudioTrimmer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ReactAudioTrimmer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ReactAudioTrimmer).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFileChange",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(file) {
        var audioBuffer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if ((0, _utils.isAudio)(file)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", alert("Unsupported File Type"));

              case 2:
                _this.setState({
                  file: file,
                  paused: true,
                  decoding: true,
                  audioBuffer: null,
                  startTime: 0,
                  currentTime: 0
                });

                _context2.next = 5;
                return _webAudio["default"].decode(file);

              case 5:
                audioBuffer = _context2.sent;
                setTimeout(
                /*#__PURE__*/
                (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee() {
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          window.audioBuffer = audioBuffer;

                          _this.setState({
                            paused: false,
                            decoding: false,
                            audioBuffer: audioBuffer,
                            startTime: 0,
                            currentTime: 0,
                            endTime: _this.props.timeLimit || _this.props.timeRange || audioBuffer.duration / 2
                          });

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })), 300);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleStartTimeChange", function (time) {
      _this.setState({
        startTime: time
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleEndTimeChange", function (time) {
      _this.setState({
        endTime: time
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleCurrentTimeChange", function (time) {
      _this.setState({
        currentTime: time
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handlePlayPauseClick", function () {
      _this.setState({
        paused: !_this.state.paused
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleReplayClick", function () {
      _this.setState({
        currentTime: _this.state.startTime
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleEncode", function (e) {
      var type = e && e.currentTarget ? e.currentTarget.dataset.type : "wav"; // const type = "wav"

      _this.encodeAudio(type);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "encodeAudio", function () {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "wav";
      var _this$state = _this.state,
          startTime = _this$state.startTime,
          endTime = _this$state.endTime,
          audioBuffer = _this$state.audioBuffer;
      var length = audioBuffer.length,
          duration = audioBuffer.duration;
      var audioSliced = (0, _audioHelper.sliceAudioBuffer)(audioBuffer, ~~(length * startTime / duration), ~~(length * endTime / duration));

      _this.setState({
        processing: true
      });

      (0, _workerClient.encode)(audioSliced, type).then(function (file) {
        file.name = _this.state.file.name;
        file.lastModified = _this.state.file.lastModified;
        file.lastModifiedDate = _this.state.file.lastModifiedDate;
        return {
          file: file,
          blobURL: (0, _utils.readBlobURL)(file)
        };
      }).then(function (_ref3) {
        var blobURL = _ref3.blobURL,
            file = _ref3.file;
        var onAudioEncode = _this.props.onAudioEncode;

        if (!onAudioEncode && _this.props.download) {
          (0, _utils.download)(blobURL, (0, _utils.rename)(_this.state.file.name, type));
        } else if (onAudioEncode && typeof onAudioEncode === "function") {
          onAudioEncode(file);
        } else {
          console.log("Audio Encoded", blobURL);
        }
      })["catch"](function (e) {
        return console.error(e);
      }).then(function () {
        _this.setState({
          processing: false
        });
      });
    });
    _this.state = {
      file: null,
      decoding: false,
      audioBuffer: null,
      paused: true,
      startTime: 0,
      endTime: Infinity,
      currentTime: 0,
      processing: false
    };
    return _this;
  }

  (0, _createClass2["default"])(ReactAudioTrimmer, [{
    key: "displaySeconds",
    value: function displaySeconds(seconds) {
      return seconds.toFixed(2) + "s";
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.state;
      return _react["default"].createElement("div", {
        className: "react-audio-trimmer"
      }, this.state.audioBuffer || this.state.decoding ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("h2", null, "Our Awesome Audio Trimmer"), this.state.decoding ? _react["default"].createElement(_DecodingIndicator["default"], null) : _react["default"].createElement(_Player["default"], {
        audioBuffer: this.state.audioBuffer,
        timeRange: this.props.timeRange,
        timeLimit: this.props.timeLimit,
        paused: this.state.paused,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        currentTime: this.state.currentTime,
        onStartTimeChange: this.handleStartTimeChange,
        onEndTimeChange: this.handleEndTimeChange,
        onCurrentTimeChange: this.handleCurrentTimeChange,
        ref: "player"
      }), _react["default"].createElement(_Controllers["default"], {
        onFileChange: this.handleFileChange,
        onPauseClick: this.handlePlayPauseClick,
        paused: state.paused,
        onReplayClick: this.handleReplayClick,
        processing: state.processing,
        onEncode: this.handleEncode,
        showEncodeBtn: this.props.showEncodeBtn
      }), state.audioBuffer && isFinite(this.state.endTime) && _react["default"].createElement(_MetaSecondsInfo["default"], {
        secondsRange: this.displaySeconds(state.endTime - state.startTime),
        duration: this.displaySeconds(state.audioBuffer.duration),
        startTime: this.displaySeconds(state.startTime),
        endTime: this.displaySeconds(state.endTime)
      })) : _react["default"].createElement("div", {
        className: "landing"
      }, _react["default"].createElement(_FilePicker["default"], {
        onChange: this.handleFileChange
      })));
    }
  }, {
    key: "startByte",
    get: function get() {
      return parseInt(this.audioBuffer.length * this.state.start / this.widthDurationRatio / this.duration, 10);
    }
  }, {
    key: "endByte",
    get: function get() {
      return parseInt(this.audioBuffer.length * this.state.end / this.widthDurationRatio / this.duration, 10);
    }
  }]);
  return ReactAudioTrimmer;
}(_react.Component);

exports["default"] = ReactAudioTrimmer;
(0, _defineProperty2["default"])(ReactAudioTrimmer, "propTypes", {
  timeLimit: _propTypes["default"].number,
  timeRange: _propTypes["default"].number,
  onAudioEncode: function onAudioEncode() {}
});
(0, _defineProperty2["default"])(ReactAudioTrimmer, "defaultProps", {
  timeLimit: 0,
  timeRange: 0,
  onAudioEncode: function onAudioEncode() {}
});