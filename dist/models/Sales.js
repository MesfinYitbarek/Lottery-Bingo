"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var WinnerSchema = new _mongoose["default"].Schema({
  bet: {
    type: Number
  },
  player: {
    type: Number
  },
  total: {
    type: Number
  },
  cut: {
    type: Number
  },
  won: {
    type: Number
  },
  branch: {
    type: String
  },
  call: {
    type: Number
  },
  winner: {
    type: [String]
  },
  // Array of winner card IDs
  cashier: {
    type: String
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var SalesSchema = new _mongoose["default"].Schema({
  winners: [WinnerSchema],
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var Sales = _mongoose["default"].model('Sales', SalesSchema);
var _default = exports["default"] = Sales;