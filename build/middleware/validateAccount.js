"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAdmin = exports.updateStatus = exports.viewMyAccount = exports.staffOnly = exports.noMultipleAccounts = void 0;

var _account = _interopRequireDefault(require("../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var noMultipleAccounts = function noMultipleAccounts(req, res, next) {
  var ownsAccount = _account["default"].accountsDb.find(function (acc) {
    return acc.owner == req.user.id;
  });

  if (ownsAccount) {
    return res.status(400).json({
      "status": 400,
      "error": "User already has an account"
    });
  } else {
    next();
  }

  ;
};

exports.noMultipleAccounts = noMultipleAccounts;

var staffOnly = function staffOnly(req, res, next) {
  if (req.user.type.toLowerCase() == "staff") {
    next();
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "You do not have the access to see this page"
    });
  }

  ;
};

exports.staffOnly = staffOnly;

var viewMyAccount = function viewMyAccount(req, res, next) {
  if (req.user.type.toLowerCase() == "staff") {
    next();
  } else {
    var myAccount = _account["default"].accountsDb.find(function (acc) {
      return acc.owner == req.user.id;
    });

    if (!myAccount) {
      return res.status(403).json({
        "status": 403,
        "error": "You do not have access to view this page"
      });
    }

    ;

    if (myAccount.accountNumber != req.params.accountNumber) {
      return res.status(403).json({
        "status": 403,
        "errror": "You do not have access to view this page"
      });
    } else {
      next();
    }

    ;
  }

  ;
};

exports.viewMyAccount = viewMyAccount;

var updateStatus = function updateStatus(req, res, next) {
  if (!req.body.status) {
    return res.status(400).json({
      "status": 400,
      "error": "Bad Request"
    });
  }

  ;
  next();
};

exports.updateStatus = updateStatus;

var verifyAdmin = function verifyAdmin(req, res, next) {
  if (req.user.type.toLowerCase() === "staff" && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      "status": 403,
      "error": "You do not have access to this page"
    });
  }
};

exports.verifyAdmin = verifyAdmin;