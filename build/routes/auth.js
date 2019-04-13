"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../Controllers/users"));

var _express = _interopRequireDefault(require("express"));

var _validateToken = _interopRequireDefault(require("../middleware/validateToken"));

var _validateUser = require("../middleware/validateUser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signup', _validateUser.validateSignUp, _users["default"].create);
router.post('/signupStaff', [_validateUser.verifyAdmin, _validateUser.staffSignup], _users["default"].createStaff);
router.post('/login', _validateUser.validateLogin, _users["default"].login);
router.get('/me', _validateToken["default"], _users["default"].getOne);
router.get('/', _validateToken["default"], _users["default"].getAll);
router.patch('/me', _validateToken["default"], _users["default"].update);
router.patch('/reset', _users["default"].passwordReset);
router["delete"]('/:id', _validateToken["default"], _users["default"].deleteUser);
var _default = router;
exports["default"] = _default;