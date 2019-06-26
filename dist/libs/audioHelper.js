"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeAudioArrayBuffer = decodeAudioArrayBuffer;
exports.sliceAudioBuffer = sliceAudioBuffer;
exports.serializeAudioBuffer = serializeAudioBuffer;

var _utils = require("./utils");

/**
 * decode arrayBuffer of audio file to AudioBuffer
 * @param {ArrayBuffer} arrayBuffer
 * @return {Promise<AudioBuffer>}
 * @deprecated use AudioContext.decodeAudioData directly
 */
function decodeAudioArrayBuffer(arrayBuffer) {
  return new AudioContext().decodeAudioData(arrayBuffer);
}
/**
 * slice AudioBuffer from start byte to end byte
 * @param {AudioBuffer} audioBuffer
 * @return {AudioBuffer}
 */


function sliceAudioBuffer(audioBuffer) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : audioBuffer.length;
  var newBuffer = new AudioContext().createBuffer(audioBuffer.numberOfChannels, end - start, audioBuffer.sampleRate);

  for (var i = 0; i < audioBuffer.numberOfChannels; i++) {
    newBuffer.copyToChannel(audioBuffer.getChannelData(i).slice(start, end), i);
  }

  return newBuffer;
}
/**
 * serialize AudioBuffer for message send
 * @param {AudioBuffer} audioBuffer
 */


function serializeAudioBuffer(audioBuffer) {
  return {
    channels: (0, _utils.range)(0, audioBuffer.numberOfChannels - 1).map(function (i) {
      return audioBuffer.getChannelData(i);
    }),
    sampleRate: audioBuffer.sampleRate,
    length: audioBuffer.length
  };
}