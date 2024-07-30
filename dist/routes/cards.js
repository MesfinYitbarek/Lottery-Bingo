"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cardsContrloller = require("../controllers/cardsContrloller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var cardRouter = _express["default"].Router();
cardRouter.get("/getCards", _cardsContrloller.getCards);
cardRouter.get("/cartela/:id", _cardsContrloller.getCardById);
cardRouter.get("/cartela/:branch/:id", _cardsContrloller.getCardByBranch);
cardRouter.post("/cards", _cardsContrloller.cards);
cardRouter.post("/create", _cardsContrloller.create);
cardRouter["delete"]("/deletecard/:id", _cardsContrloller.deleteBranch);
var _default = exports["default"] = cardRouter;