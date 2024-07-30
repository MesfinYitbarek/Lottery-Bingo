"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _branchControllers = require("../controllers/branchControllers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var branchRouter = _express["default"].Router();
branchRouter.post("/createbranch/:id", _branchControllers.createBranch);
branchRouter.get("/branch", _branchControllers.branch);
branchRouter.get("/getbranch/:id", _branchControllers.getBranch);
branchRouter.get("/branch/:id", _branchControllers.branchEdit);
branchRouter["delete"]("/deletebranch/:id", _branchControllers.deleteBranch);
branchRouter.post("/updatebranch/:id", _branchControllers.updateBranch);
var _default = exports["default"] = branchRouter;