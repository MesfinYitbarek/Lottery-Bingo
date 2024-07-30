"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _users = _interopRequireDefault(require("./routes/users.js"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cards = _interopRequireDefault(require("./routes/cards.js"));
var _credit = _interopRequireDefault(require("./routes/credit.js"));
var _sales = _interopRequireDefault(require("./routes/sales.js"));
var _Agent = _interopRequireDefault(require("./routes/Agent.js"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Connect to MongoDB database
_dotenv["default"].config();
_mongoose["default"].connect(process.env.MONGO).then(function () {
  console.log("Connected to MongoDB!");
})["catch"](function (err) {
  console.log(err);
});
var _dirname = _path["default"].resolve();
var app = (0, _express["default"])();

//mongodb+srv://mesfinyitbarek55:12348109@lotterybingo.knjysl9.mongodb.net/?retryWrites=true&w=majority&appName=LotteryBingo

// Middleware
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use("/api/user", _users["default"]);
app.use("/api/card", _cards["default"]);
app.use("/api/credit", _credit["default"]);
app.use("/api/sales", _sales["default"]);
app.use("/api/branch", _Agent["default"]);
app.use(_express["default"]["static"](_path["default"].join(_dirname, '/LotteryBingo/build')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(_dirname, 'LotteryBingo', 'build', 'index.html'));
});
app.use(function (err, req, res, next) {
  var statusCode = err.statusCode || 500;
  var message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
});
app.listen(4000, function () {
  console.log("App is listening on port: 4000");
});