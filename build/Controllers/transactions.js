"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transaction = _interopRequireDefault(require("../models/transaction"));

var _account = _interopRequireDefault(require("../models/account"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Transaction =
/*#__PURE__*/
function () {
  function Transaction() {
    _classCallCheck(this, Transaction);
  }

  _createClass(Transaction, [{
    key: "debit",
    value: function () {
      var _debit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _data;

        var transaction, account;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                transaction = _transaction["default"].createTransaction(req.body.amount);

                if (transaction) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).send('Invalid Input'));

              case 3:
                ;
                transaction.accountNumber = req.params.accountNumber;
                transaction.type = "Debit";
                account = _account["default"].getAccount(transaction.accountNumber);
                transaction.oldBalance = parseFloat(account.balance);
                transaction.newBalance = transaction.oldBalance - parseFloat(transaction.amount);
                account.balance = transaction.newBalance;
                res.status(201).json({
                  "status": 201,
                  "data": (_data = {
                    "id": transaction.id,
                    "type": transaction.type,
                    "accountNumber": parseIn(transaction.accountNumber, 10),
                    "cashier": req.user.id
                  }, _defineProperty(_data, "type", "Debit"), _defineProperty(_data, "oldBalance", transaction.oldBalance), _defineProperty(_data, "newBalance", transaction.newBalance), _data)
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function debit(_x, _x2) {
        return _debit.apply(this, arguments);
      }

      return debit;
    }()
  }, {
    key: "credit",
    value: function () {
      var _credit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var transaction, account;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                transaction = _transaction["default"].createTransaction(req.body.amount);

                if (transaction) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send('Invalid Input'));

              case 3:
                ;
                transaction.accountNumber = req.params.accountNumber;
                transaction.type = "Credit";
                account = _account["default"].getAccount(transaction.accountNumber);
                transaction.oldBalance = parseFloat(account.balance);
                transaction.newBalance = transaction.oldBalance + parseFloat(transaction.amount);
                account.balance = transaction.newBalance;
                res.status(201).json({
                  "status": 201,
                  "data": {
                    "id": transaction.id,
                    "type": transaction.type,
                    "accountNumber": parseIn(transaction.accountNumber, 10),
                    "cashier": req.user.id,
                    "oldBalance": transaction.oldBalance,
                    "newBalance": transaction.newBalance
                  }
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function credit(_x3, _x4) {
        return _credit.apply(this, arguments);
      }

      return credit;
    }()
  }, {
    key: "getAll",
    value: function getAll(req, res) {
      if (req.user.type.toLowerCase() === "client") {
        var account = _account["default"].accountsDb.find(function (account) {
          return account.owner === req.user.id;
        });

        if (!account) {
          return res.status(400).json({
            "status": 400,
            "error": "User has no account"
          });
        }

        ;

        var transactionList = _transaction["default"].transactionDb.filter(function (trans) {
          return parseInt(trans.accountNumber) === account.accountNumber;
        });

        if (!transactionList) {
          return res.status(204).json({
            "status": 204,
            "error": "User has no transaction"
          });
        } else {
          return res.status(200).json({
            "status": 200,
            "data": transactionList
          });
        }
      } else {
        var transactions = _transaction["default"].getAllTransactions();

        return res.status(200).json({
          "status": 200,
          "data": transactions
        });
      }
    }
  }, {
    key: "getOne",
    value: function getOne(req, res) {
      if (req.user.type.toLowerCase() === "client") {
        var account = _account["default"].accountsDb.find(function (account) {
          return account.owner === req.user.id;
        });

        if (!account) {
          return res.status(400).json({
            "status": 400,
            "error": "User has no account"
          });
        }

        ;
        var id = parseInt(req.params.id, 10);

        var singleTransaction = _transaction["default"].getATransaction(id);

        if (!singleTransaction) {
          return res.status(404).json({
            "status": 404,
            "error": "User has no transaction with the id ".concat(id)
          });
        } else {
          if (parseInt(singleTransaction.accountNumber, 10) === account.accountNumber) {
            return res.status(200).json({
              "status": 200,
              "data": singleTransaction
            });
          } else {
            return res.status(404).json({
              "status": 404,
              "error": "User has no transaction with the id ".concat(id)
            });
          }
        }
      } else {
        var foundTransaction = _transaction["default"].getATransaction(req.params.id);

        return res.status(200).json({
          "status": 200,
          "data": foundTransaction
        });
      }
    }
  }, {
    key: "deleteTransaction",
    value: function deleteTransaction(req, res) {
      var id = parseInt(req.params.id, 10);

      var unwantedTransaction = _transaction["default"].deleteTransaction(id);

      console.log(unwantedTransaction);

      if (unwantedTransaction.length > 0) {
        return res.status(203).json({
          "status": 203,
          "message": "Transaction successfully deleted"
        });
      } else {
        return res.status(404).json({
          "status": 404,
          "error": "Transaction not found"
        });
      }
    }
  }]);

  return Transaction;
}();

var _default = new Transaction();

exports["default"] = _default;