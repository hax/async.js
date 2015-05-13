"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = async;

function async(generator) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var it = generator.apply(undefined, args);
		return new Promise(function (resolve, reject) {

			it_next();

			function nextStep(_ref) {
				var done = _ref.done;
				var value = _ref.value;

				if (done) resolve(value);else {
					try {
						Promise.resolve(value).then(it_next, it_throw);
					} catch (e) {
						it_throw(e);
					}
				}
			}

			function it_next(v) {
				try {
					return nextStep(it.next(v));
				} catch (e) {
					return it_throw(e);
				}
			}

			function it_throw(v) {
				try {
					return nextStep(it["throw"](v));
				} catch (e) {
					reject(e);
					it["return"]();
				}
			}
		});
	};
}

module.exports = exports["default"];