"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _accounts = _interopRequireDefault(require("./routes/accounts"));

var _validateToken = _interopRequireDefault(require("./middleware/validateToken"));

var _transactions = _interopRequireDefault(require("./routes/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use('/api/v1/auth', _auth["default"]);
app.use('/api/v1/accounts', _validateToken["default"], _accounts["default"]);
app.use('/api/v1/transactions', _validateToken["default"], _transactions["default"]);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App is listening on port: ".concat(port));
});
var _default = app;
exports["default"] = _default;