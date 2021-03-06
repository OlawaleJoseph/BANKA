"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAdmin = exports.validateCashier = void 0;

var validateCashier = function validateCashier(req, res, next) {
  if (req.user.type.toLowerCase() !== 'staff' || req.user.isAdmin) {
    return res.json({
      "status": 403,
      "error": "You do not have access to view this page"
    });
  } else {
    next();
  }
};

exports.validateCashier = validateCashier;

var validateAdmin = function validateAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(403).json({
      "status": 403,
      "error": "You do not have access to view this page"
    });
  } else {
    next();
  }
};

exports.validateAdmin = validateAdmin;