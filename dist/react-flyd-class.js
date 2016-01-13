(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("flyd"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "flyd"], factory);
	else if(typeof exports === 'object')
		exports["ReactFlydClass"] = factory(require("react"), require("flyd"));
	else
		root["ReactFlydClass"] = factory(root["React"], root["flyd"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.reactive = reactive;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _createReactiveClass = __webpack_require__(2);

	var _createReactiveClass2 = _interopRequireDefault(_createReactiveClass);

	function reactive(reactClass) {
	  return (0, _createReactiveClass2['default'])(reactClass);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	exports['default'] = createReactiveClass;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _flyd = __webpack_require__(4);

	var _utils = __webpack_require__(3);

	function createReactiveClass(tag) {
	  var ReactiveClass = (function (_React$Component) {
	    _inherits(ReactiveClass, _React$Component);

	    function ReactiveClass(props) {
	      _classCallCheck(this, ReactiveClass);

	      _get(Object.getPrototypeOf(ReactiveClass.prototype), 'constructor', this).call(this, props);
	      this.displayName = 'FlydReactiveElement-' + tag;
	      this.state = (0, _utils.pickProps)(props, function (key, value) {
	        return !(0, _flyd.isStream)(value);
	      });
	      this.state.mount = true;
	    }

	    _createClass(ReactiveClass, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        this.subscribe(this.props);
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        this.subscribe(nextProps);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.unsubscribe();
	      }
	    }, {
	      key: 'addPropListener',
	      value: function addPropListener(name, prop$) {
	        var _this = this;

	        return (0, _flyd.on)(function (value) {
	          // don't re-render if value is the same.
	          if (value === _this.state[name]) {
	            return;
	          }

	          var prop = {};
	          prop[name] = value;
	          _this.setState(prop);
	        }, prop$);
	      }
	    }, {
	      key: 'subscribe',
	      value: function subscribe(props) {
	        var _this2 = this;

	        if (this.subscriptions) {
	          this.unsubscribe();
	        }

	        this.subscriptions = [];

	        Object.keys(props).forEach(function (key) {
	          var value = props[key];
	          if ((0, _flyd.isStream)(value)) {
	            var subscription = _this2.addPropListener(key, value);
	            _this2.subscriptions.push(subscription);
	          }
	        });
	      }
	    }, {
	      key: 'unsubscribe',
	      value: function unsubscribe() {
	        this.subscriptions.forEach(function (subscription) {
	          return subscription.end();
	        });
	        this.subscriptions = null;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        if (!this.state.mount) {
	          return null;
	        }

	        var finalProps = (0, _utils.pickProps)(this.state, function (key) {
	          return key !== 'mount';
	        });
	        return _react2['default'].createElement(tag, finalProps);
	      }
	    }]);

	    return ReactiveClass;
	  })(_react2['default'].Component);

	  return ReactiveClass;
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pickProps = pickProps;

	function pickProps(props, validator) {
	  var picked = {};

	  Object.keys(props).forEach(function (key) {
	    var value = props[key];
	    if (validator(key, value)) {
	      picked[key] = value;
	    }
	  });

	  return picked;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;