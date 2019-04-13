"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Account =
/*#__PURE__*/
function () {
  function Account() {
    _classCallCheck(this, Account);
  }

  _createClass(Account, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var account;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                account = _account["default"].createAccount(req.body);

                if (account) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).send('Invalid Input'));

              case 3:
                ;
                account.owner = req.user.id;

                if (account.balance < 1 && req.user.type.toLowerCase() !== "staff") {
                  account.status = "draft";
                } else {
                  account.status = "active";
                }

                res.json({
                  "status": 201,
                  "data": {
                    "accountNumber": account.accountNumber,
                    "firstName": req.user.firstName,
                    "lastName": req.user.lastName,
                    "email": req.user.email,
                    "type": account.type,
                    "openingBalance": account.balance
                  }
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getAll",
    value: function getAll(req, res) {
      var accounts = _account["default"].getAllAccounts();

      res.json({
        "status": 200,
        "data": accounts
      });
    }
  }, {
    key: "getOne",
    value: function getOne(req, res) {
      var account = _account["default"].getAccount(req.params.accountNumber);

      if (!account) {
        return res.status(400).json({
          "status": 400,
          "error": "Account not found"
        });
      }

      res.status(200).json({
        "status": 200,
        "data": account
      });
    }
  }, {
    key: "update",
    value: function update(req, res) {
      var account = _account["default"].updateAccount(req.params.accountNumber, req.body.status);

      if (account) {
        res.status(200).json({
          "status": 200,
          "data": account
        });
      } else {
        return res.status(400).json({
          "status": 400,
          "error": " Invalid account number"
        });
      }
    }
  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var account = _account["default"].deleteAccount(req.params.accountNumber);

      if (!account) {
        return res.status(203).json({
          "status": 400,
          "message": "Invalid Account"
        });
      }

      res.status(200).json({
        "status": 203,
        "message": "Account successfully deleted"
      });
    }
  }]);

  return Account;
}();

var _default = new Account();

exports["default"] = _default;