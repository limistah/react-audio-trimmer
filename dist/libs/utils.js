"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leftZero = exports.formatSeconds = exports.rename = exports.download = exports.readBlobURL = exports.readDataURL = exports.readArrayBuffer = exports.readFile = exports.range = exports.isAudio = void 0;

/**
 * detect if a file is an audio.
 * @param {File} file
 */
var isAudio = function isAudio(file) {
  return file.type.indexOf("audio") > -1;
};
/**
 * create range [min .. max]
 */


exports.isAudio = isAudio;

var range = function range(min, max) {
  return Array.apply(null, {
    length: max - min + 1
  }).map(function (v, i) {
    return i + min;
  });
};
/**
 * FileReader via promise
 * @param {File} file
 * @param {string} dataType
 * @return {Promise<ArrayBuffer | string>}
 */


exports.range = range;

var readFile = function readFile(file, dataType) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader["readAs" + dataType](file);

    reader.onload = function () {
      return resolve(reader.result);
    };

    reader.onerror = function (err) {
      return reject(err);
    };
  });
};
/**
 * Read File/Blob to ArrayBuffer
 * @param {File} file
 * @return {Promise<ArrayBuffer>}
 */


exports.readFile = readFile;

var readArrayBuffer = function readArrayBuffer(file) {
  return readFile(file, "ArrayBuffer");
};
/**
 * Read File/Blob to Base64
 * @param {File} file
 * @return {Promise<string>}
 */


exports.readArrayBuffer = readArrayBuffer;

var readDataURL = function readDataURL(file) {
  return readFile(file, "DataURL");
};

exports.readDataURL = readDataURL;

var readBlobURL = function readBlobURL(file) {
  return URL.createObjectURL(file);
};

exports.readBlobURL = readBlobURL;

var download = function download(url, name) {
  var link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
};

exports.download = download;

var rename = function rename(filename, ext, stamp) {
  return "".concat(filename.replace(/\.\w+$/, "")).concat(stamp || "", ".").concat(ext);
};
/**
 * format seconds to [minutes, integer, decimal(2)]
 * @param {number} seconds
 */


exports.rename = rename;

var formatSeconds = function formatSeconds(seconds) {
  return [Math.floor(seconds / 60), Math.floor(seconds % 60), Math.round(seconds % 1 * 100)];
};

exports.formatSeconds = formatSeconds;

var leftZero = function leftZero(num, count) {
  return ("000000" + num).slice(-count);
};

exports.leftZero = leftZero;