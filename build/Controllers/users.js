"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _sendEmail = _interopRequireDefault(require("../helperFunctions/sendEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var user, token, subject, message, mail;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _userModel["default"].createUser(req.body);

              case 2:
                user = _context.sent;

                if (user) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).send('Invalid Input'));

              case 5:
                ;
                _context.prev = 6;
                _context.next = 9;
                return _userModel["default"].generateToken(user.email);

              case 9:
                token = _context.sent;
                subject = "Welcome to BANKA";
                message = "Welcome to Banka, Your NO.1 BANK!!!";
                _context.next = 14;
                return (0, _sendEmail["default"])(user.email, subject, message);

              case 14:
                mail = _context.sent;
                res.json({
                  "status": 201,
                  "data": {
                    token: token,
                    "id": user.id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email
                  }
                });
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](6);
                console.error(_context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 18]]);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "createStaff",
    value: function () {
      var _createStaff = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var user, token, subject, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _userModel["default"].createStaff(req.body);

              case 2:
                user = _context2.sent;

                if (user) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(400).send('Invalid Input'));

              case 5:
                _context2.prev = 5;
                _context2.next = 8;
                return _userModel["default"].generateToken(user.email);

              case 8:
                token = _context2.sent;
                subject = "Welcome to BANKA";
                message = "Welcome to Banka ".concat(user.firstName, ", Welcome to the BANKA team");
                _context2.next = 13;
                return (0, _sendEmail["default"])(user.email, subject, message);

              case 13:
                res.status(201).json({
                  "status": 201,
                  "data": {
                    token: token,
                    "id": user.id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "type": user.type
                  }
                });
                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](5);
                console.error(_context2.t0);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 16]]);
      }));

      function createStaff(_x3, _x4) {
        return _createStaff.apply(this, arguments);
      }

      return createStaff;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var user, token;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _userModel["default"].login(req.body.email, req.body.password);

              case 2:
                user = _context3.sent;

                if (user) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  "status": 400,
                  "error": "Invalid email or password"
                }));

              case 7:
                _context3.next = 9;
                return _userModel["default"].generateToken(user.email);

              case 9:
                token = _context3.sent;
                res.status(200).json({
                  "status": 200,
                  "data": {
                    token: token,
                    "id": user.id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email
                  }
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function login(_x5, _x6) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "getOne",
    value: function getOne(req, res) {
      var user = _userModel["default"].getAUser(req.user.email);

      if (!user) {
        return res.status(400).send('Invalid Request');
      }

      res.status(200).json({
        "status": 200,
        "data": user
      });
    }
  }, {
    key: "getAll",
    value: function getAll(req, res) {
      if (req.user.type == "staff") {
        var users = _userModel["default"].getAllUsers();

        res.status(200).json({
          "status": 200,
          "data": users
        });
      } else {
        res.status(403).json({
          "status": 403,
          "error": "You do not have the access to view this page"
        });
      }
    }
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _userModel["default"].updateUser(req.user.email, req.body.password);

              case 2:
                user = _context4.sent;

                if (user) {
                  res.status(200).json({
                    "status": 200,
                    "message": "Password Changed Successfully"
                  });
                } else {
                  res.status(500).json({
                    "status": 500,
                    "message": "Internal Server Error"
                  });
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "passwordReset",
    value: function () {
      var _passwordReset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var udpdatedInfo, updatedUser, randomPassword, subject, message;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _userModel["default"].resetPassword(req.body.email);

              case 2:
                udpdatedInfo = _context5.sent;

                if (udpdatedInfo) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  "status": 400,
                  "error": "Invalid email"
                }));

              case 7:
                updatedUser = udpdatedInfo.updatedUser, randomPassword = udpdatedInfo.randomPassword;
                subject = "PASSWORD RESET SUCCESSFUL";
                message = "YOUR NEW PASSWORD IS ".concat(randomPassword, ".");
                _context5.prev = 10;
                _context5.next = 13;
                return (0, _sendEmail["default"])(req.body.email, subject, message);

              case 13:
                res.status(200).json({
                  "status": 200,
                  "message": "Hi ".concat(updatedUser.firstName, " check your email for your new password ")
                });
                _context5.next = 20;
                break;

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](10);
                console.error(_context5.t0);
                res.status(500).status.json({
                  "status": 500,
                  "error": "Internal Server Error"
                });

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[10, 16]]);
      }));

      function passwordReset(_x9, _x10) {
        return _passwordReset.apply(this, arguments);
      }

      return passwordReset;
    }()
  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      if (req.user.isAdmin) {
        var user = _userModel["default"].deleteUser(req.params.id);

        if (user) {
          res.status(200).json({
            "status": 203,
            "message": "User deleted successfully"
          });
        } else {
          res.status(400).json({
            "status": 400,
            "error": "Invalid User"
          });
        }
      } else {
        res.status(403).json({
          "status": 403,
          "error": "You do not have access to this page"
        });
      }
    }
  }]);

  return User;
}();

;

var _default = new User();

exports["default"] = _default;