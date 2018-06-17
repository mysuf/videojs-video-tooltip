// these helper functions are part of video.js but not exported

export function getBoundingClientRect(el) {
	if (el && el.getBoundingClientRect && el.parentNode) {
		var rect = el.getBoundingClientRect();
		var result = {};

		['bottom', 'height', 'left', 'right', 'top', 'width'].forEach(function (k) {
			if (rect[k] !== undefined) {
				result[k] = rect[k];
			}
		});

		if (!result.height) {
			result.height = parseFloat(computedStyle(el, 'height'));
		}

		if (!result.width) {
			result.width = parseFloat(computedStyle(el, 'width'));
		}

		return result;
	}
};

export function debounce(func, wait, immediate) {
	var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window_1;

	var timeout = void 0;

	/* eslint-disable consistent-this */
	return function () {
		var self = this;
		var args = arguments;

		var _later = function later() {
			timeout = null;
			_later = null;
			if (!immediate) {
				func.apply(self, args);
			}
		};

		if (!timeout && immediate) {
			func.apply(self, args);
		}

		context.clearTimeout(timeout);
		timeout = context.setTimeout(_later, wait);
	};
	/* eslint-enable consistent-this */
};