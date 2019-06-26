"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.worker = void 0;

var _audioHelper = require("./audioHelper");

var _workerSetup = _interopRequireDefault(require("./workerSetup"));

var _worker = _interopRequireDefault(require("./worker"));

var worker = new _workerSetup["default"](_worker["default"]);
/**
 * use worker to encode audio
 * @param {AudioBuffer} audioBuffer
 * @param {string} type
 * @return {Promise<Blob>}
 */

exports.worker = worker;

var encode = function encode(audioBuffer, type) {
  var id = Math.random();
  return new Promise(function (resolve, reject) {
    var audioData = (0, _audioHelper.serializeAudioBuffer)(audioBuffer);
    worker.postMessage({
      type: type,
      audioData: audioData,
      id: id
    });
    /**
     * Worker message event listener
     * @param {MessageEvent} e
     */

    var listener = function listener(_ref) {
      var data = _ref.data;
      if (!data || data.id !== id) return;

      if (data.error) {
        reject(new Error(data.message));
      } else {
        resolve(data.blob);
      }

      worker.removeEventListener("message", listener);
    };

    worker.addEventListener("message", listener);
  });
};

exports.encode = encode;