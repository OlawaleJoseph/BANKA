"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLogin = exports.verifyAdmin = exports.staffSignup = exports.validateSignUp = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var validateSignUp = function validateSignUp(req, res, next) {
  if (!req.body.firstName || /[^a-zA-z]/.test(req.body.firstName)) {
    return res.status(400).json({
      "status": 400,
      "error": "First name is required"
    });
  } else if (req.body.firstName.length < 3 || req.body.firstName.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "First name should be between 3 to 25 characters"
    });
  }

  if (!req.body.lastName || /[^a-zA-z]/.test(req.body.lastName)) {
    return res.status(400).json({
      "status": 400,
      "error": "Last name is required"
    });
  } else if (req.body.lastName.length < 3 || req.body.lastName.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "Last name should be between 3 to 25 characters"
    });
  }

  if (!req.body.email) {
    return res.status(400).json({
      "status": 400,
      "error": "email is required"
    });
  } else if (!/^[a-z0-9\+\-_\.]+@[a-z\d\-.]+\.[a-z]+$/i.test(req.body.email)) {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid email"
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      "status": 400,
      "error": "Password is required"
    });
  } else if (req.body.password.length < 6 || req.body.password.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "Password should be between 6 to 25 characters"
    });
  }

  if (!req.body.type || /[^a-zA-z]/.test(req.body.type)) {
    return res.status(400).json({
      "status": 400,
      "error": "Type of user is required"
    });
  } else if (req.body.type.toLowerCase() != "staff" && req.body.type.toLowerCase() != "client") {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid user Type"
    });
  } else {
    var user = _userModel["default"].getAUser(req.body.email);

    if (user) {
      return res.status(400).json({
        "status": 400,
        "error": "Email already registered"
      });
    }
  }

  next();
};

exports.validateSignUp = validateSignUp;

var staffSignup = function staffSignup(req, res, next) {
  if (!req.body.firstName || /[^a-zA-z]/.test(req.body.firstName)) {
    return res.status(400).json({
      "status": 400,
      "error": "First name is required"
    });
  } else if (req.body.firstName.length < 3 || req.body.firstName.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "First name should be between 3 to 25 characters"
    });
  }

  if (!req.body.lastName || /[^a-zA-z]/.test(req.body.lastName)) {
    return res.status(400).json({
      "status": 400,
      "error": "Last name is required"
    });
  } else if (req.body.lastName.length < 3 || req.body.lastName.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "Last name should be between 3 to 25 characters"
    });
  }

  if (!req.body.email) {
    return res.status(400).json({
      "status": 400,
      "error": "email is required"
    });
  } else if (!/^[a-z0-9\+\-_\.]+@[a-z\d\-.]+\.[a-z]+$/i.test(req.body.email)) {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid email"
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      "status": 400,
      "error": "Password is required"
    });
  } else if (req.body.password.length < 6 || req.body.password.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "Password should be between 6 to 25 characters"
    });
  } else {
    var user = _userModel["default"].getAUser(req.body.email);

    if (user) {
      return res.status(400).json({
        "status": 400,
        "error": "Email already registered"
      });
    }
  }

  next();
};

exports.staffSignup = staffSignup;

var verifyAdmin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decodedToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers['x-access-token'];

            if (token) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              "status": 400,
              "error": "No token"
            }));

          case 5:
            _context.prev = 5;
            decodedToken = _jsonwebtoken["default"].verify(token, process.env.SECRET);
            req.user = decodedToken;

            if (!req.user.isAdmin) {
              _context.next = 12;
              break;
            }

            next();
            _context.next = 13;
            break;

          case 12:
            return _context.abrupt("return", res.status(403).json({
              "status": 403,
              "error": "Forbidden to view this page"
            }));

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](5);
            return _context.abrupt("return", res.status(400).json({
              "status": 400,
              "error": "Invalid Token"
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 15]]);
  }));

  return function verifyAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyAdmin = verifyAdmin;

var validateLogin = function validateLogin(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var emailRegex = /^[a-z0-9\+\-_\.]+@[a-z\d\-.]+\.[a-z]+$/i;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid Email"
    });
  } else if (!password) {
    return res.status(400).json({
      "status": 400,
      "error": "Password required"
    });
  } else {
    next();
  }
};

exports.validateLogin = validateLogin;