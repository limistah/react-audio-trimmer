"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * 找出数组某区域最大最小值
 * @param {Array<number>} array
 * @param {number} start
 * @param {number} end
 */
function getMinMaxInRange(array, start, end) {
  var min = 0;
  var min1 = 0;
  var max = 0;
  var max1 = 0;
  var current;
  var step = parseInt((end - start) / 15);

  for (var i = start; i < end; i = i + step) {
    current = array[i];

    if (current < min) {
      min1 = min;
      min = current;
    } else if (current > max) {
      max1 = max;
      max = current;
    }
  }

  return [(min + min1) / 2, (max + max1) / 2];
}
/**
 * 峰值取样
 * @param {number} width
 * @param {Float32Array} data
 * @return {Array<[number, number]>}
 */


function _default(width, data) {
  var dataLength = data.length;
  var size = dataLength / width;
  var current = 0;
  var peaks = new Array(width);

  for (var i = 0; i < width; i++) {
    var start = ~~current;
    current = current + size;
    var end = ~~current;
    peaks[i] = getMinMaxInRange(data, start, end);
  }

  return peaks;
}