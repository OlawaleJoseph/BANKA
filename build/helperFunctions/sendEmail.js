"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _nodemailerSmtpTransport = _interopRequireDefault(require("nodemailer-smtp-transport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var sendMail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(email, subject, message) {
    var transport, mailOptions, mail;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transport = _nodemailer["default"].createTransport((0, _nodemailerSmtpTransport["default"])({
              service: "gmail",
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: 'bankaadc@gmail.com',
                pass: process.env.mailPassword
              },
              tls: {
                rejectUnauthorized: false
              }
            }));
            mailOptions = {
              from: '"Olawale" <bankaadc@gmail.com>',
              to: email,
              subject: subject,
              text: message
            };
            _context.prev = 2;
            _context.next = 5;
            return transport.sendMail(mailOptions);

          case 5:
            mail = _context.sent;

            if (!mail) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", mail);

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            if (_context.t0) console.log(_context.t0);
            return _context.abrupt("return", null);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function sendMail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendMail;
exports["default"] = _default;