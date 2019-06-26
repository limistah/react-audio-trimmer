"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var WebWorker = function WebWorker(worker) {
  (0, _classCallCheck2["default"])(this, WebWorker);
  var code = worker.toString();
  var blob = new Blob(["(" + code + ")()"]);
  return new Worker(URL.createObjectURL(blob));
};

exports["default"] = WebWorker;