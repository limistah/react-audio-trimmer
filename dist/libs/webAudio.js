"use strict";

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

var _events = require("events");

var _utils = require("./utils");

var WebAudio =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2["default"])(WebAudio, _EventEmitter);

  /**
   * @type {number}
   */

  /**
   * @type {number}
   */

  /**
   * @param {AudioBuffer} audioBuffer
   */
  function WebAudio(audioBuffer) {
    var _this;

    (0, _classCallCheck2["default"])(this, WebAudio);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WebAudio).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "audioContext", new AudioContext());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "startRunetime", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "startTime", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_playing", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onended", function () {
      _this.pause();

      _this.pause();

      _this.pause();

      _this.emit("end");
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onprocess", function () {
      _this.emit("process", _this.currentPosition);
    });
    _this.audioBuffer = audioBuffer;

    _this._initAudioComponent();

    return _this;
  }

  (0, _createClass2["default"])(WebAudio, [{
    key: "_initAudioComponent",
    value: function _initAudioComponent() {
      var audioContext = this.audioContext;
      var gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      var scriptNode = audioContext.createScriptProcessor(4096);
      scriptNode.onaudioprocess = this.onprocess;
      this.gainNode = gainNode;
      this.scriptNode = scriptNode;
    }
  }, {
    key: "_beforePlay",
    value: function _beforePlay() {
      var audioContext = this.audioContext,
          audioBuffer = this.audioBuffer,
          gainNode = this.gainNode,
          scriptNode = this.scriptNode;

      if (!this.paused) {
        this.pause();
      }

      scriptNode.connect(audioContext.destination);
      var source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(gainNode);
      source.onended = this.onended;
      this.source = source;
      this._playing = true;
    }
  }, {
    key: "_afterStop",
    value: function _afterStop() {
      this.source.disconnect();
      this.scriptNode.disconnect();
      this._playing = false;
    }
  }, {
    key: "play",
    value: function play() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentPosition;

      this._beforePlay();

      var source = this.source;
      this.startRunetime = this.audioContext.currentTime;
      this.startTime = start;
      source.start(0, start);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.source.stop();

      this._afterStop();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._afterStop();

      this.gainNode.disconnect();
      this.removeAllListeners();
    }
    /**
     * decode blob to audio data
     * @param {Blob} blob
     * @return {Promise<AudioBuffer>}
     */

  }, {
    key: "currentPosition",
    get: function get() {
      return this.audioContext.currentTime - this.startRunetime + this.startTime;
    }
  }, {
    key: "paused",
    get: function get() {
      return !this._playing;
    }
  }], [{
    key: "decode",
    value: function () {
      var _decode = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(blob) {
        var arrayBuffer, audioBuffer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _utils.readArrayBuffer)(blob);

              case 2:
                arrayBuffer = _context.sent;
                _context.next = 5;
                return new AudioContext().decodeAudioData(arrayBuffer);

              case 5:
                audioBuffer = _context.sent;
                return _context.abrupt("return", audioBuffer);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function decode(_x) {
        return _decode.apply(this, arguments);
      }

      return decode;
    }()
  }]);
  return WebAudio;
}(_events.EventEmitter);

exports["default"] = WebAudio;