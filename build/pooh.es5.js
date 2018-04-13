var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Poohjs = function () {
  function Poohjs() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Poohjs);

    this.defaults = {
      honeypotSelector: '.ResultsFormFeature .floatField.hp',
      formSelector: '.ResultsFormFeature .simple_form',
      additionalDataSelector: '.ResultsFormFeature .simple_form #lead_additional_data'
    };

    this.settings = _extends({}, this.defaults, data);

    this.fields = [].concat(_toConsumableArray(document.querySelectorAll(this.settings.honeypotSelector + ' input')));
    this.form = document.querySelector(this.settings.formSelector);
    this.additionalDataField = document.querySelector(this.settings.additionalDataSelector);
  }

  _createClass(Poohjs, [{
    key: 'init',
    value: function init() {
      if (!this.form) {
        return;
      }

      this.form.addEventListener('submit', this.spamCheck.bind(this));
    }
  }, {
    key: 'spamCheck',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var isSpam, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isSpam = false;

                e.preventDefault();

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                for (_iterator = this.fields[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  field = _step.value;

                  if (field.value !== '') {
                    isSpam = true;
                  }
                }

                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 13:
                _context.prev = 13;
                _context.prev = 14;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 16:
                _context.prev = 16;

                if (!_didIteratorError) {
                  _context.next = 19;
                  break;
                }

                throw _iteratorError;

              case 19:
                return _context.finish(16);

              case 20:
                return _context.finish(13);

              case 21:
                if (!isSpam) {
                  _context.next = 24;
                  break;
                }

                _context.next = 24;
                return this.addExtraData();

              case 24:
                this.form.submit();

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 9, 13, 21], [14,, 16, 20]]);
      }));

      function spamCheck(_x2) {
        return _ref.apply(this, arguments);
      }

      return spamCheck;
    }()
  }, {
    key: 'addExtraData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var response, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getClientIP();

              case 2:
                response = _context2.sent;
                _context2.next = 5;
                return response.json();

              case 5:
                data = _context2.sent;

                this.additionalDataField.value = window.navigator.userAgent + ':::' + data.ip;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addExtraData() {
        return _ref2.apply(this, arguments);
      }

      return addExtraData;
    }()
  }, {
    key: 'getClientIP',
    value: function getClientIP() {
      return fetch('https://api.ipify.org?format=json');
    }
  }]);

  return Poohjs;
}();

export default Poohjs;
