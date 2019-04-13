"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transaction =
/*#__PURE__*/
function () {
  function Transaction() {
    _classCallCheck(this, Transaction);

    this.transactionDb = [];
  }

  _createClass(Transaction, [{
    key: "createTransaction",
    value: function createTransaction(amount) {
      try {
        var newTransaction = {
          id: this.transactionDb.length + 1,
          amount: parseFloat(amount),
          createdOn: (0, _moment["default"])()
        };
        this.transactionDb.push(newTransaction);
        return newTransaction;
      } catch (err) {
        console.log(err);
      }
    }
  }, {
    key: "getATransaction",
    value: function getATransaction(id) {
      var foundID = this.transactionDb.find(function (transaction) {
        return transaction.id === id;
      });

      if (foundID) {
        return foundID;
      } else {
        return null;
      }
    }
  }, {
    key: "getAllTransactions",
    value: function getAllTransactions() {
      return this.transactionDb;
    }
  }, {
    key: "deleteTransaction",
    value: function deleteTransaction(id) {
      var transaction = this.getATransaction(id);
      var index = this.transactionDb.indexOf(transaction);
      return this.transactionDb.splice(index, 1);
    }
  }]);

  return Transaction;
}();

var _default = new Transaction();

exports["default"] = _default;