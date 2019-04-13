"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactions = _interopRequireDefault(require("../Controllers/transactions"));

var _validateStaff = require("../middleware/validateStaff");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/:accountNumber/debit', _validateStaff.validateCashier, _transactions["default"].debit);
router.post('/:accountNumber/credit', _validateStaff.validateCashier, _transactions["default"].credit);
router.get('/', _transactions["default"].getAll);
router.get('/:id', _transactions["default"].getOne);
router["delete"]('/:id', _validateStaff.validateAdmin, _transactions["default"].deleteTransaction);
var _default = router;
exports["default"] = _default;