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

var Account =
/*#__PURE__*/
function () {
  function Account() {
    _classCallCheck(this, Account);

    this.accountsDb = [];
  }

  _createClass(Account, [{
    key: "generateAccountNumber",
    value: function generateAccountNumber() {
      var accountNumber = '1';

      while (accountNumber.length !== 10) {
        accountNumber += Math.floor(Math.random() * 9);
      }

      return parseInt(accountNumber);
    }
  }, {
    key: "createAccount",
    value: function createAccount(data, owner) {
      var status;
      var type = data.type,
          amount = data.amount;

      if (!/\d/.test(amount) || /[^a-z]/gi.test(type)) {
        return null;
      }

      var accountNumber = this.generateAccountNumber();

      if (parseFloat(amount) === 0) {
        status = 'draft';
      } else {
        status = 'active';
      }

      var newAccount = {
        id: this.accountsDb.length + 1,
        accountNumber: accountNumber,
        type: type,
        balance: parseFloat(amount),
        createdDate: (0, _moment["default"])(),
        owner: owner,
        status: status
      };
      this.accountsDb.push(newAccount);
      return newAccount;
    }
  }, {
    key: "getAccount",
    value: function getAccount(number) {
      if (!number) {
        return null;
      }

      var account = this.accountsDb.find(function (account) {
        return account.accountNumber === parseInt(number);
      });

      if (!account) {
        return null;
      }

      return account;
    }
  }, {
    key: "getAllAccounts",
    value: function getAllAccounts() {
      return this.accountsDb;
    }
  }, {
    key: "updateAccount",
    value: function updateAccount(number, status) {
      if (!number) {
        return null;
      }

      var account = this.getAccount(number);

      if (!account) {
        return null;
      }

      var index = this.accountsDb.indexOf(account);
      account.status = status;
      account.modifiedDate = (0, _moment["default"])();
      return this.accountsDb[index];
    }
  }, {
    key: "deleteAccount",
    value: function deleteAccount(number) {
      if (!number) {
        return null;
      }

      var account = this.getAccount(number);

      if (!account) {
        return undefined;
      }

      var index = this.accountsDb.indexOf(account);
      return this.accountsDb.splice(index, 1);
    }
  }]);

  return Account;
}();

var _default = new Account();

exports["default"] = _default;