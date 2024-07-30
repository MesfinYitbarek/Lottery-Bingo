"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _usersController = require("../controllers/usersController.js");
var _branchControllers = require("../controllers/branchControllers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userRouter = _express["default"].Router();
userRouter.get("/test", _usersController.test);
userRouter.get("/users/:id", _usersController.users);
userRouter.get("/getusers/:id", _usersController.getusers);
userRouter["delete"]('/delete/:id', _usersController.deleteAdmin);
userRouter.post("/signup/:id", _usersController.signup);
userRouter.post("/signin", _usersController.signin);
userRouter.post('/update/:id', _usersController.updateAdmin);
userRouter.get("/userEdit/:id", _usersController.userEdit);
userRouter.get("/signout", _usersController.signout);
userRouter.put('/:userId/change-password', _usersController.changePassword);
userRouter.post("/createbranch/:id", _usersController.createBranch);
userRouter.get("/branch", _usersController.branch);
userRouter.put('/:userId/balance', _usersController.cutBalance);
userRouter.get("/branch/:id", _usersController.branchEdit);
userRouter["delete"]("/deletebranch/:id", _usersController.deleteBranch);
userRouter.post("/updatebranch/:id", _usersController.updateBranch);
var _default = exports["default"] = userRouter;