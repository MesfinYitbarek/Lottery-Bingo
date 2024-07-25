"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _creditController = require("../controllers/creditController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var creditRouter = _express["default"].Router();
creditRouter.get("/getCredit/:id", _creditController.getCredit);
//creditRouter.get("/delete/:id", deleteCredit);
creditRouter.post("/create/:id", _creditController.credit);
creditRouter.post("/transfer", _creditController.transfer);
creditRouter.get("/:id/balance", _creditController.balance);
creditRouter["delete"]("/delete/:id", _creditController.deleteTransfer);
creditRouter["delete"]("/deletecredit/:id", _creditController.deleteCredit);
var _default = exports["default"] = creditRouter;