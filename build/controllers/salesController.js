"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.salesTimeByBranch = exports.salesTime = exports.salesBranchByBranch = exports.salesBranch = exports.sales = exports.getSalesByCashier = exports.getSales = exports.deleteBranch = void 0;
var _Sales = _interopRequireDefault(require("../models/Sales.js"));
var _error = _interopRequireDefault(require("../Utils/error.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var sales = exports.sales = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var winners, newSales;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          winners = req.body.winners;
          if (!(!Array.isArray(winners) || winners.length === 0)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "No winners provided"
          }));
        case 3:
          newSales = new _Sales["default"]({
            winners: winners.map(function (winner) {
              return {
                bet: winner.bet,
                player: winner.player,
                total: winner.total,
                cut: winner.cut,
                won: winner.won,
                branch: winner.branch,
                call: winner.call,
                winner: winner.winner,
                // This should be an array of winner card IDs
                cashier: winner.cashier,
                createdAt: new Date()
              };
            })
          });
          _context.prev = 4;
          _context.next = 7;
          return newSales.save();
        case 7:
          res.status(200).json({
            message: "Bingo data saved successfully"
          });
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          console.error("Error saving bingo data:", _context.t0);
          res.status(500).json({
            message: "Failed to save bingo data"
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 10]]);
  }));
  return function sales(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getSales = exports.getSales = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Sales["default"].find();
        case 3:
          users = _context2.sent;
          res.json(users);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: 'Failed to fetch Sales'
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getSales(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getSalesByCashier = exports.getSalesByCashier = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _sales;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Sales["default"].find({
            'winners.cashier': req.params.cashier
          });
        case 3:
          _sales = _context3.sent;
          res.json(_sales);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: 'Failed to fetch sales'
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getSalesByCashier(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteBranch = exports.deleteBranch = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var _sales2;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Sales["default"].findById(req.params.id);
        case 3:
          _sales2 = _context4.sent;
          if (_sales2) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", next((0, _error["default"])(404, "Sales not found!")));
        case 6:
          _context4.next = 8;
          return _Sales["default"].findByIdAndDelete(req.params.id);
        case 8:
          res.status(200).json("Sales has been deleted!");
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function deleteBranch(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

// Endpoint to get aggregated sales data over different time periods
var salesTime = exports.salesTime = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _dailyTotal$, _weeklyTotal$, _monthlyTotal$, _yearlyTotal$, now, startOfDay, startOfWeek, startOfMonth, startOfYear, aggregateSales, dailyTotal, weeklyTotal, monthlyTotal, yearlyTotal;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          now = new Date();
          startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Calculate start of the week (Sunday)
          startOfWeek = new Date(startOfDay);
          startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
          startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          startOfYear = new Date(now.getFullYear(), 0, 1); // Aggregate sales data
          aggregateSales = /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(startDate) {
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return _Sales["default"].aggregate([{
                      $unwind: '$winners'
                    }, {
                      $match: {
                        'winners.createdAt': {
                          $gte: startDate
                        }
                      }
                    }, {
                      $group: {
                        _id: null,
                        total: {
                          $sum: '$winners.total'
                        }
                      }
                    }]);
                  case 2:
                    return _context5.abrupt("return", _context5.sent);
                  case 3:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function aggregateSales(_x12) {
              return _ref6.apply(this, arguments);
            };
          }(); // Aggregate sales data for each time period
          _context6.next = 10;
          return aggregateSales(startOfDay);
        case 10:
          dailyTotal = _context6.sent;
          _context6.next = 13;
          return aggregateSales(startOfWeek);
        case 13:
          weeklyTotal = _context6.sent;
          _context6.next = 16;
          return aggregateSales(startOfMonth);
        case 16:
          monthlyTotal = _context6.sent;
          _context6.next = 19;
          return aggregateSales(startOfYear);
        case 19:
          yearlyTotal = _context6.sent;
          // Send the response with summed totals
          res.json({
            dailyTotal: ((_dailyTotal$ = dailyTotal[0]) === null || _dailyTotal$ === void 0 ? void 0 : _dailyTotal$.total) || 0,
            weeklyTotal: ((_weeklyTotal$ = weeklyTotal[0]) === null || _weeklyTotal$ === void 0 ? void 0 : _weeklyTotal$.total) || 0,
            monthlyTotal: ((_monthlyTotal$ = monthlyTotal[0]) === null || _monthlyTotal$ === void 0 ? void 0 : _monthlyTotal$.total) || 0,
            yearlyTotal: ((_yearlyTotal$ = yearlyTotal[0]) === null || _yearlyTotal$ === void 0 ? void 0 : _yearlyTotal$.total) || 0
          });
          _context6.next = 27;
          break;
        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](0);
          console.error('Error fetching aggregated sales data:', _context6.t0);
          res.status(500).json({
            error: 'Failed to fetch aggregated sales data'
          });
        case 27:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 23]]);
  }));
  return function salesTime(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
var salesBranch = exports.salesBranch = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var salesByBranch, salesByCashier;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _Sales["default"].aggregate([{
            $unwind: '$winners'
          }, {
            $group: {
              _id: '$winners.branch',
              total: {
                $sum: '$winners.total'
              }
            }
          }]);
        case 3:
          salesByBranch = _context7.sent;
          _context7.next = 6;
          return _Sales["default"].aggregate([{
            $unwind: '$winners'
          }, {
            $group: {
              _id: '$winners.cashier',
              total: {
                $sum: '$winners.total'
              }
            }
          }]);
        case 6:
          salesByCashier = _context7.sent;
          res.json({
            salesByBranch: salesByBranch,
            salesByCashier: salesByCashier
          });
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            error: 'Failed to fetch grouped sales data'
          });
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function salesBranch(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var salesTimeByBranch = exports.salesTimeByBranch = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var branch, branches, now, startOfDay, startOfWeek, startOfMonth, startOfYear, getMatchStage, aggregateSales, sumTotals, dailyTotals, weeklyTotals, monthlyTotals, yearlyTotals;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          branch = req.query.branch;
          branches = branch ? branch.split(',') : [];
          now = new Date(); // Set dates without hours to ensure day-level granularity
          startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Calculate start of the week (Sunday)
          startOfWeek = new Date(startOfDay);
          startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
          startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          startOfYear = new Date(now.getFullYear(), 0, 1); // Function to get the match stage for aggregation pipeline
          getMatchStage = function getMatchStage(date, branch) {
            return branch ? {
              $match: {
                'winners.branch': branch,
                'createdAt': {
                  $gte: date
                }
              }
            } : {
              $match: {
                'createdAt': {
                  $gte: date
                }
              }
            };
          }; // Function to aggregate sales data
          aggregateSales = /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(branch, startDate) {
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _Sales["default"].aggregate([{
                      $unwind: '$winners'
                    }, getMatchStage(startDate, branch), {
                      $group: {
                        _id: null,
                        total: {
                          $sum: '$winners.total'
                        }
                      }
                    }]);
                  case 2:
                    return _context8.abrupt("return", _context8.sent);
                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function aggregateSales(_x17, _x18) {
              return _ref9.apply(this, arguments);
            };
          }(); // Function to sum totals
          sumTotals = function sumTotals(totals) {
            return totals.reduce(function (acc, total) {
              var _total$;
              return acc + (((_total$ = total[0]) === null || _total$ === void 0 ? void 0 : _total$.total) || 0);
            }, 0);
          }; // If no branches are provided, handle it gracefully
          if (branches.length === 0) {
            branches.push(null); // Add a null branch to handle the case with no specific branches
          }

          // Aggregate sales data for each time period
          _context9.next = 15;
          return Promise.all(branches.map(function (branch) {
            return aggregateSales(branch, startOfDay);
          }));
        case 15:
          dailyTotals = _context9.sent;
          _context9.next = 18;
          return Promise.all(branches.map(function (branch) {
            return aggregateSales(branch, startOfWeek);
          }));
        case 18:
          weeklyTotals = _context9.sent;
          _context9.next = 21;
          return Promise.all(branches.map(function (branch) {
            return aggregateSales(branch, startOfMonth);
          }));
        case 21:
          monthlyTotals = _context9.sent;
          _context9.next = 24;
          return Promise.all(branches.map(function (branch) {
            return aggregateSales(branch, startOfYear);
          }));
        case 24:
          yearlyTotals = _context9.sent;
          // Send the response with summed totals
          res.json({
            dailyTotal: sumTotals(dailyTotals),
            weeklyTotal: sumTotals(weeklyTotals),
            monthlyTotal: sumTotals(monthlyTotals),
            yearlyTotal: sumTotals(yearlyTotals)
          });
          _context9.next = 32;
          break;
        case 28:
          _context9.prev = 28;
          _context9.t0 = _context9["catch"](0);
          console.error('Error fetching aggregated sales data:', _context9.t0);
          res.status(500).json({
            error: 'Failed to fetch aggregated sales data'
          });
        case 32:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 28]]);
  }));
  return function salesTimeByBranch(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var salesBranchByBranch = exports.salesBranchByBranch = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var branch, branches, matchStage, aggregateBranchSales, aggregateCashierSales, salesByBranchPromises, salesByCashierPromises, salesByBranchResults, salesByCashierResults, mergeResults, salesByBranch, salesByCashier;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          branch = req.query.branch;
          branches = branch ? branch.split(',') : [];
          matchStage = function matchStage(branch) {
            return branch ? {
              $match: {
                'winners.branch': branch
              }
            } : {};
          };
          console.log('Branch:', branch);
          console.log('Branches array:', branches);
          aggregateBranchSales = /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(branch) {
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return _Sales["default"].aggregate([{
                      $unwind: '$winners'
                    }, matchStage(branch), {
                      $group: {
                        _id: '$winners.branch',
                        total: {
                          $sum: '$winners.total'
                        }
                      }
                    }]);
                  case 2:
                    return _context10.abrupt("return", _context10.sent);
                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function aggregateBranchSales(_x21) {
              return _ref11.apply(this, arguments);
            };
          }();
          console.log('Aggregate Branch Sales function:', aggregateBranchSales);
          aggregateCashierSales = /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(branch) {
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return _Sales["default"].aggregate([{
                      $unwind: '$winners'
                    }, matchStage(branch), {
                      $group: {
                        _id: '$winners.cashier',
                        total: {
                          $sum: '$winners.total'
                        }
                      }
                    }]);
                  case 2:
                    return _context11.abrupt("return", _context11.sent);
                  case 3:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            return function aggregateCashierSales(_x22) {
              return _ref12.apply(this, arguments);
            };
          }();
          salesByBranchPromises = branches.map(function (branch) {
            return aggregateBranchSales(branch);
          });
          salesByCashierPromises = branches.map(function (branch) {
            return aggregateCashierSales(branch);
          });
          _context12.next = 13;
          return Promise.all(salesByBranchPromises);
        case 13:
          salesByBranchResults = _context12.sent;
          _context12.next = 16;
          return Promise.all(salesByCashierPromises);
        case 16:
          salesByCashierResults = _context12.sent;
          console.log('Sales by Branch Results:', salesByBranchResults);
          console.log('Sales by Cashier Results:', salesByCashierResults);
          mergeResults = function mergeResults(results) {
            var merged = {};
            results.flat().forEach(function (item) {
              if (merged[item._id]) {
                merged[item._id] += item.total;
              } else {
                merged[item._id] = item.total;
              }
            });
            return Object.entries(merged).map(function (_ref13) {
              var _ref14 = _slicedToArray(_ref13, 2),
                id = _ref14[0],
                total = _ref14[1];
              return {
                _id: id,
                total: total
              };
            });
          };
          salesByBranch = mergeResults(salesByBranchResults);
          salesByCashier = mergeResults(salesByCashierResults);
          res.json({
            salesByBranch: salesByBranch,
            salesByCashier: salesByCashier
          });
          _context12.next = 29;
          break;
        case 25:
          _context12.prev = 25;
          _context12.t0 = _context12["catch"](0);
          console.error('Error fetching grouped sales data:', _context12.t0);
          res.status(500).json({
            error: 'Failed to fetch grouped sales data'
          });
        case 29:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 25]]);
  }));
  return function salesBranchByBranch(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();