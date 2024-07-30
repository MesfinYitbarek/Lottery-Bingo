"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CreditSchema = new _mongoose["default"].Schema({
  sender: {
    type: String
  },
  receiver: {
    type: String
  },
  amount: {
    type: Number
  },
  birr: {
    type: Number
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var Credit = _mongoose["default"].model('Credit', CreditSchema);
var _default = exports["default"] = Credit;