"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _salesController = require("../controllers/salesController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var salesRouter = _express["default"].Router();
salesRouter.get("/getSales", _salesController.getSales);
salesRouter.get("/getSales/:cashier", _salesController.getSalesByCashier);
salesRouter.post("/sales", _salesController.sales);
salesRouter.get("/salesBranch", _salesController.salesBranch);
salesRouter.get('/salesTimeByBranch', _salesController.salesTimeByBranch);
salesRouter.get('/salesBranchByBranch', _salesController.salesBranchByBranch);
salesRouter.get("/salesTime", _salesController.salesTime);
salesRouter["delete"]("/deletesales/:id", _salesController.deleteBranch);
var _default = exports["default"] = salesRouter;