"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var cardSchema = new _mongoose["default"].Schema({
  id: {
    type: Number,
    required: true
  },
  branch: {
    type: String
  },
  card: {
    B: [Number],
    I: [Number],
    N: {
      type: [_mongoose["default"].Schema.Types.Mixed],
      // To handle 'Free' string and numbers
      validate: {
        validator: function validator(v) {
          // Ensure the middle cell of 'N' is 'Free'
          return v[2] === 'Free';
        },
        message: function message(props) {
          return "The middle cell of 'N' column must be 'Free'.";
        }
      }
    },
    G: [Number],
    O: [Number]
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var Card = _mongoose["default"].model('Cards', cardSchema);
var _default = exports["default"] = Card;