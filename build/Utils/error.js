"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var errorHandler = function errorHandler(statusCode, message) {
  var error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
var _default = exports["default"] = errorHandler;