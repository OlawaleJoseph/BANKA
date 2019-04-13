"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _account = _interopRequireDefault(require("../Controllers/account"));

var _validateAccount = require("../middleware/validateAccount");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _validateAccount.noMultipleAccounts, _account["default"].create);
router.get('/', _validateAccount.staffOnly, _account["default"].getAll);
router.get('/:accountNumber', _validateAccount.viewMyAccount, _account["default"].getOne);
router.patch('/:accountNumber', [_validateAccount.verifyAdmin, _validateAccount.updateStatus], _account["default"].update);
router["delete"]('/:accountNumber', _validateAccount.verifyAdmin, _account["default"].deleteAccount);
var _default = router;
exports["default"] = _default;