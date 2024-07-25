"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BranchSchema = new _mongoose["default"].Schema({
  userRef: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  agent: {
    type: String
  },
  location: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Branch = _mongoose["default"].model("Branchees", BranchSchema);
var _default = exports["default"] = Branch;