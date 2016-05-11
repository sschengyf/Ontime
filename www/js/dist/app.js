/******/ (function(modules) { // webpackBootstrap
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

	var _ngRedux = __webpack_require__(1);

	var _ngRedux2 = _interopRequireDefault(_ngRedux);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('ontime', ['ionic', 'ontime.controllers', 'ontime.services', 'ontime.directives', 'ngCordova', _ngRedux2.default]).run(function ($ionicPlatform) {
	  $ionicPlatform.ready(function () {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);
	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	    }
	  });
	}).config(function ($stateProvider, $urlRouterProvider) {

	  // Ionic uses AngularUI Router which uses the concept of states
	  // Learn more here: https://github.com/angular-ui/ui-router
	  // Set up the various states which the app can be in.
	  // Each state's controller can be found in controllers.js
	  $stateProvider

	  // setup an abstract state for the tabs directive

	  // Each tab has its own nav history stack:

	  .state('cities', {
	    url: '/cities',
	    templateUrl: 'templates/cities.html',
	    controller: 'CitiesCtrl'
	  }).state('add', {
	    url: '/add',
	    templateUrl: 'templates/add.html',
	    controller: 'CityAddCtrl'
	  });

	  // if none of the above states are matched, use this as the fallback
	  $urlRouterProvider.otherwise('/cities');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	!function (t) {
	  function n(r) {
	    if (e[r]) return e[r].exports;var o = e[r] = { exports: {}, id: r, loaded: !1 };return t[r].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports;
	  }var e = {};return n.m = t, n.c = e, n.p = "", n(0);
	}([function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return t && t.__esModule ? t : { "default": t };
	  }n.__esModule = !0;var o = e(1),
	      u = r(o);n["default"] = angular.module("ngRedux", []).provider("$ngRedux", u["default"]).name;
	}, function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return t && t.__esModule ? t : { "default": t };
	  }function o() {
	    var t = void 0,
	        n = void 0,
	        e = void 0,
	        r = void 0;this.createStoreWith = function (o, i, c, a) {
	      (0, f["default"])((0, g["default"])(o), "The reducer parameter passed to createStoreWith must be a Function. Instead received %s.", "undefined" == typeof o ? "undefined" : u(o)), (0, f["default"])(!c || (0, h["default"])(c), "The storeEnhancers parameter passed to createStoreWith must be an Array. Instead received %s.", "undefined" == typeof c ? "undefined" : u(c)), t = o, e = c, n = i || [], r = a || {};
	    }, this.$get = function (o) {
	      for (var u = void 0, i = [], a = n, f = Array.isArray(a), s = 0, a = f ? a : a[Symbol.iterator]();;) {
	        var p;if (f) {
	          if (s >= a.length) break;p = a[s++];
	        } else {
	          if (s = a.next(), s.done) break;p = s.value;
	        }var v = p;"string" == typeof v ? i.push(o.get(v)) : i.push(v);
	      }var h = e ? l.compose.apply(void 0, e)(l.createStore) : l.createStore;return i.push((0, d["default"])(o.get("$rootScope"))), u = l.applyMiddleware.apply(void 0, i)(h)(t, r), (0, y["default"])({}, u, { connect: (0, c["default"])(u) });
	    }, this.$get.$inject = ["$injector"];
	  }var u = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
	    return typeof t === "undefined" ? "undefined" : _typeof(t);
	  } : function (t) {
	    return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
	  };n.__esModule = !0, n["default"] = o;var i = e(2),
	      c = r(i),
	      a = e(15),
	      f = r(a),
	      l = e(5),
	      s = e(33),
	      d = r(s),
	      p = e(23),
	      y = r(p),
	      v = e(20),
	      h = r(v),
	      b = e(21),
	      g = r(b);
	}, function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return t && t.__esModule ? t : { "default": t };
	  }function o(t) {
	    return function (n, e) {
	      var r = n || w,
	          o = (0, y["default"])(e) ? (0, l["default"])(e) : e || x;(0, d["default"])((0, h["default"])(r), "mapStateToTarget must be a Function. Instead received $s.", r), (0, d["default"])((0, y["default"])(o) || (0, h["default"])(o), "mapDispatchToTarget must be a plain Object or a Function. Instead received $s.", o);var c = i(t.getState(), r),
	          f = o(t.dispatch);return function (n) {
	        (0, d["default"])((0, h["default"])(n) || (0, g["default"])(n), "The target parameter passed to connect must be a Function or a object."), u(n, c, f);var e = t.subscribe(function () {
	          var e = i(t.getState(), r);(0, a["default"])(c, e) || (c = e, u(n, c, f));
	        });return e;
	      };
	    };
	  }function u(t, n, e) {
	    (0, h["default"])(t) ? t(n, e) : (0, j["default"])(t, n, e);
	  }function i(t, n) {
	    var e = n(t);return (0, d["default"])((0, y["default"])(e), "`mapStateToScope` must return an object. Instead received %s.", e), e;
	  }n.__esModule = !0, n["default"] = o;var c = e(3),
	      a = r(c),
	      f = e(4),
	      l = r(f),
	      s = e(15),
	      d = r(s),
	      p = e(16),
	      y = r(p),
	      v = e(21),
	      h = r(v),
	      b = e(22),
	      g = r(b),
	      m = e(23),
	      j = r(m),
	      w = function w() {
	    return {};
	  },
	      x = function x(t) {
	    return { dispatch: t };
	  };
	}, function (t, n) {
	  "use strict";
	  function e(t, n) {
	    if (t === n) return !0;var e = Object.keys(t).filter(function (t) {
	      return "$$hashKey" !== t;
	    }),
	        r = Object.keys(n).filter(function (t) {
	      return "$$hashKey" !== t;
	    });if (e.length !== r.length) return !1;for (var o = Object.prototype.hasOwnProperty, u = 0; u < e.length; u++) {
	      if (!o.call(n, e[u]) || t[e[u]] !== n[e[u]]) return !1;
	    }return !0;
	  }n.__esModule = !0, n["default"] = e;
	}, function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return function (n) {
	      return (0, o.bindActionCreators)(t, n);
	    };
	  }n.__esModule = !0, n["default"] = r;var o = e(5);
	}, function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return t && t.__esModule ? t : { "default": t };
	  }n.__esModule = !0;var o = e(6),
	      u = r(o),
	      i = e(8),
	      c = r(i),
	      a = e(12),
	      f = r(a),
	      l = e(13),
	      s = r(l),
	      d = e(14),
	      p = r(d);n.createStore = u["default"], n.combineReducers = c["default"], n.bindActionCreators = f["default"], n.applyMiddleware = s["default"], n.compose = p["default"];
	}, function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return t && t.__esModule ? t : { "default": t };
	  }function o(t, n) {
	    function e() {
	      return f;
	    }function r(t) {
	      l.push(t);var n = !0;return function () {
	        if (n) {
	          n = !1;var e = l.indexOf(t);l.splice(e, 1);
	        }
	      };
	    }function o(t) {
	      if (!i["default"](t)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if ("undefined" == typeof t.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if (s) throw new Error("Reducers may not dispatch actions.");try {
	        s = !0, f = a(f, t);
	      } finally {
	        s = !1;
	      }return l.slice().forEach(function (t) {
	        return t();
	      }), t;
	    }function u(t) {
	      a = t, o({ type: c.INIT });
	    }if ("function" != typeof t) throw new Error("Expected the reducer to be a function.");var a = t,
	        f = n,
	        l = [],
	        s = !1;return o({ type: c.INIT }), { dispatch: o, subscribe: r, getState: e, replaceReducer: u };
	  }n.__esModule = !0, n["default"] = o;var u = e(7),
	      i = r(u),
	      c = { INIT: "@@redux/INIT" };n.ActionTypes = c;
	}, function (t, n) {
	  "use strict";
	  function e(t) {
	    if (!t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) return !1;var n = "function" == typeof t.constructor ? Object.getPrototypeOf(t) : Object.prototype;if (null === n) return !0;var e = n.constructor;return "function" == typeof e && e instanceof e && r(e) === o;
	  }n.__esModule = !0, n["default"] = e;var r = function r(t) {
	    return Function.prototype.toString.call(t);
	  },
	      o = r(Object);t.exports = n["default"];
	}, function (t, n, e) {
	  (function (r) {
	    "use strict";
	    function o(t) {
	      return t && t.__esModule ? t : { "default": t };
	    }function u(t, n) {
	      var e = n && n.type,
	          r = e && '"' + e.toString() + '"' || "an action";return 'Reducer "' + t + '" returned undefined handling ' + r + ". To ignore an action, you must explicitly return the previous state.";
	    }function i(t, n, e) {
	      var r = Object.keys(n),
	          o = e && e.type === f.ActionTypes.INIT ? "initialState argument passed to createStore" : "previous state received by the reducer";if (0 === r.length) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if (!s["default"](t)) return "The " + o + ' has unexpected type of "' + {}.toString.call(t).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + r.join('", "') + '"');var u = Object.keys(t).filter(function (t) {
	        return r.indexOf(t) < 0;
	      });return u.length > 0 ? "Unexpected " + (u.length > 1 ? "keys" : "key") + " " + ('"' + u.join('", "') + '" found in ' + o + ". ") + "Expected to find one of the known reducer keys instead: " + ('"' + r.join('", "') + '". Unexpected keys will be ignored.') : void 0;
	    }function c(t) {
	      Object.keys(t).forEach(function (n) {
	        var e = t[n],
	            r = e(void 0, { type: f.ActionTypes.INIT });if ("undefined" == typeof r) throw new Error('Reducer "' + n + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');var o = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");if ("undefined" == typeof e(void 0, { type: o })) throw new Error('Reducer "' + n + '" returned undefined when probed with a random type. ' + ("Don't try to handle " + f.ActionTypes.INIT + ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.");
	      });
	    }function a(t) {
	      var n,
	          e = v["default"](t, function (t) {
	        return "function" == typeof t;
	      });try {
	        c(e);
	      } catch (o) {
	        n = o;
	      }var a = p["default"](e, function () {});return function (t, o) {
	        if (void 0 === t && (t = a), n) throw n;var c = !1,
	            f = p["default"](e, function (n, e) {
	          var r = t[e],
	              i = n(r, o);if ("undefined" == typeof i) {
	            var a = u(e, o);throw new Error(a);
	          }return c = c || i !== r, i;
	        });if ("production" !== r.env.NODE_ENV) {
	          var l = i(t, f, o);l && console.error(l);
	        }return c ? f : t;
	      };
	    }n.__esModule = !0, n["default"] = a;var f = e(6),
	        l = e(7),
	        s = o(l),
	        d = e(10),
	        p = o(d),
	        y = e(11),
	        v = o(y);t.exports = n["default"];
	  }).call(n, e(9));
	}, function (t, n) {
	  function e() {
	    f = !1, i.length ? a = i.concat(a) : l = -1, a.length && r();
	  }function r() {
	    if (!f) {
	      var t = setTimeout(e);f = !0;for (var n = a.length; n;) {
	        for (i = a, a = []; ++l < n;) {
	          i && i[l].run();
	        }l = -1, n = a.length;
	      }i = null, f = !1, clearTimeout(t);
	    }
	  }function o(t, n) {
	    this.fun = t, this.array = n;
	  }function u() {}var i,
	      c = t.exports = {},
	      a = [],
	      f = !1,
	      l = -1;c.nextTick = function (t) {
	    var n = new Array(arguments.length - 1);if (arguments.length > 1) for (var e = 1; e < arguments.length; e++) {
	      n[e - 1] = arguments[e];
	    }a.push(new o(t, n)), 1 !== a.length || f || setTimeout(r, 0);
	  }, o.prototype.run = function () {
	    this.fun.apply(null, this.array);
	  }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = u, c.addListener = u, c.once = u, c.off = u, c.removeListener = u, c.removeAllListeners = u, c.emit = u, c.binding = function (t) {
	    throw new Error("process.binding is not supported");
	  }, c.cwd = function () {
	    return "/";
	  }, c.chdir = function (t) {
	    throw new Error("process.chdir is not supported");
	  }, c.umask = function () {
	    return 0;
	  };
	}, function (t, n) {
	  "use strict";
	  function e(t, n) {
	    return Object.keys(t).reduce(function (e, r) {
	      return e[r] = n(t[r], r), e;
	    }, {});
	  }n.__esModule = !0, n["default"] = e, t.exports = n["default"];
	}, function (t, n) {
	  "use strict";
	  function e(t, n) {
	    return Object.keys(t).reduce(function (e, r) {
	      return n(t[r]) && (e[r] = t[r]), e;
	    }, {});
	  }n.__esModule = !0, n["default"] = e, t.exports = n["default"];
	}, function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return t && t.__esModule ? t : { "default": t };
	  }function o(t, n) {
	    return function () {
	      return n(t.apply(void 0, arguments));
	    };
	  }function u(t, n) {
	    if ("function" == typeof t) return o(t, n);if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) || null === t || void 0 === t) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === t ? "null" : typeof t === "undefined" ? "undefined" : _typeof(t)) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');return c["default"](t, function (t) {
	      return o(t, n);
	    });
	  }n.__esModule = !0, n["default"] = u;var i = e(10),
	      c = r(i);t.exports = n["default"];
	}, function (t, n, e) {
	  "use strict";
	  function r(t) {
	    return t && t.__esModule ? t : { "default": t };
	  }function o() {
	    for (var t = arguments.length, n = Array(t), e = 0; t > e; e++) {
	      n[e] = arguments[e];
	    }return function (t) {
	      return function (e, r) {
	        var o = t(e, r),
	            i = o.dispatch,
	            a = [],
	            f = { getState: o.getState, dispatch: function dispatch(t) {
	            return i(t);
	          } };return a = n.map(function (t) {
	          return t(f);
	        }), i = c["default"].apply(void 0, a)(o.dispatch), u({}, o, { dispatch: i });
	      };
	    };
	  }n.__esModule = !0;var u = Object.assign || function (t) {
	    for (var n = 1; n < arguments.length; n++) {
	      var e = arguments[n];for (var r in e) {
	        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
	      }
	    }return t;
	  };n["default"] = o;var i = e(14),
	      c = r(i);t.exports = n["default"];
	}, function (t, n) {
	  "use strict";
	  function e() {
	    for (var t = arguments.length, n = Array(t), e = 0; t > e; e++) {
	      n[e] = arguments[e];
	    }return function (t) {
	      return n.reduceRight(function (t, n) {
	        return n(t);
	      }, t);
	    };
	  }n.__esModule = !0, n["default"] = e, t.exports = n["default"];
	}, function (t, n, e) {
	  (function (n) {
	    "use strict";
	    var e = function e(t, _e, r, o, u, i, c, a) {
	      if ("production" !== n.env.NODE_ENV && void 0 === _e) throw new Error("invariant requires an error message argument");if (!t) {
	        var f;if (void 0 === _e) f = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
	          var l = [r, o, u, i, c, a],
	              s = 0;f = new Error(_e.replace(/%s/g, function () {
	            return l[s++];
	          })), f.name = "Invariant Violation";
	        }throw f.framesToPop = 1, f;
	      }
	    };t.exports = e;
	  }).call(n, e(9));
	}, function (t, n, e) {
	  function r(t) {
	    return !!t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
	  }function o(t, n) {
	    return i(t, n, a);
	  }function u(t) {
	    var n;if (!r(t) || d.call(t) != f || c(t) || !s.call(t, "constructor") && (n = t.constructor, "function" == typeof n && !(n instanceof n))) return !1;var e;return o(t, function (t, n) {
	      e = n;
	    }), void 0 === e || s.call(t, e);
	  }var i = e(17),
	      c = e(18),
	      a = e(19),
	      f = "[object Object]",
	      l = Object.prototype,
	      s = l.hasOwnProperty,
	      d = l.toString;t.exports = u;
	}, function (t, n) {
	  function e(t) {
	    return function (n, e, r) {
	      for (var o = -1, u = Object(n), i = r(n), c = i.length; c--;) {
	        var a = i[t ? c : ++o];if (e(u[a], a, u) === !1) break;
	      }return n;
	    };
	  }var r = e();t.exports = r;
	}, function (t, n) {
	  (function (n) {
	    function e(t) {
	      return function (n) {
	        return null == n ? void 0 : n[t];
	      };
	    }function r(t) {
	      return u(t) && v.call(t, "callee") && (!b.call(t, "callee") || h.call(t) == s);
	    }function o(t) {
	      return null != t && !("function" == typeof t && i(t)) && c(g(t));
	    }function u(t) {
	      return f(t) && o(t);
	    }function i(t) {
	      var n = a(t) ? h.call(t) : "";return n == d || n == p;
	    }function c(t) {
	      return "number" == typeof t && t > -1 && t % 1 == 0 && l >= t;
	    }function a(t) {
	      var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	    }function f(t) {
	      return !!t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
	    }var l = 9007199254740991,
	        s = "[object Arguments]",
	        d = "[object Function]",
	        p = "[object GeneratorFunction]",
	        y = n.Object.prototype,
	        v = y.hasOwnProperty,
	        h = y.toString,
	        b = y.propertyIsEnumerable,
	        g = e("length");t.exports = r;
	  }).call(n, function () {
	    return this;
	  }());
	}, function (t, n, e) {
	  function r(t, n) {
	    return t = "number" == typeof t || f.test(t) ? +t : -1, n = null == n ? d : n, t > -1 && t % 1 == 0 && n > t;
	  }function o(t) {
	    return "number" == typeof t && t > -1 && t % 1 == 0 && d >= t;
	  }function u(t) {
	    var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	  }function i(t) {
	    if (null == t) return [];u(t) || (t = Object(t));var n = t.length;n = n && o(n) && (a(t) || c(t)) && n || 0;for (var e = t.constructor, i = -1, f = "function" == typeof e && e.prototype === t, l = Array(n), d = n > 0; ++i < n;) {
	      l[i] = i + "";
	    }for (var p in t) {
	      d && r(p, n) || "constructor" == p && (f || !s.call(t, p)) || l.push(p);
	    }return l;
	  }var c = e(18),
	      a = e(20),
	      f = /^\d+$/,
	      l = Object.prototype,
	      s = l.hasOwnProperty,
	      d = 9007199254740991;t.exports = i;
	}, function (t, n) {
	  function e(t) {
	    return !!t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
	  }function r(t, n) {
	    var e = null == t ? void 0 : t[n];return c(e) ? e : void 0;
	  }function o(t) {
	    return "number" == typeof t && t > -1 && t % 1 == 0 && b >= t;
	  }function u(t) {
	    return i(t) && y.call(t) == f;
	  }function i(t) {
	    var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	  }function c(t) {
	    return null == t ? !1 : u(t) ? v.test(d.call(t)) : e(t) && l.test(t);
	  }var a = "[object Array]",
	      f = "[object Function]",
	      l = /^\[object .+?Constructor\]$/,
	      s = Object.prototype,
	      d = Function.prototype.toString,
	      p = s.hasOwnProperty,
	      y = s.toString,
	      v = RegExp("^" + d.call(p).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
	      h = r(Array, "isArray"),
	      b = 9007199254740991,
	      g = h || function (t) {
	    return e(t) && o(t.length) && y.call(t) == a;
	  };t.exports = g;
	}, function (t, n) {
	  (function (n) {
	    function e(t) {
	      var n = r(t) ? c.call(t) : "";return n == o || n == u;
	    }function r(t) {
	      var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	    }var o = "[object Function]",
	        u = "[object GeneratorFunction]",
	        i = n.Object.prototype,
	        c = i.toString;t.exports = e;
	  }).call(n, function () {
	    return this;
	  }());
	}, function (t, n) {
	  function e(t) {
	    var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	  }t.exports = e;
	}, function (t, n, e) {
	  function r(t, n, e) {
	    for (var r = -1, o = i(n), u = o.length; ++r < u;) {
	      var c = o[r],
	          a = t[c],
	          f = e(a, n[c], c, t, n);(f === f ? f === a : a !== a) && (void 0 !== a || c in t) || (t[c] = f);
	    }return t;
	  }var o = e(24),
	      u = e(29),
	      i = e(26),
	      c = u(function (t, n, e) {
	    return e ? r(t, n, e) : o(t, n);
	  });t.exports = c;
	}, function (t, n, e) {
	  function r(t, n) {
	    return null == n ? t : o(n, u(n), t);
	  }var o = e(25),
	      u = e(26);t.exports = r;
	}, function (t, n) {
	  function e(t, n, e) {
	    e || (e = {});for (var r = -1, o = n.length; ++r < o;) {
	      var u = n[r];e[u] = t[u];
	    }return e;
	  }t.exports = e;
	}, function (t, n, e) {
	  function r(t) {
	    return function (n) {
	      return null == n ? void 0 : n[t];
	    };
	  }function o(t) {
	    return null != t && i(g(t));
	  }function u(t, n) {
	    return t = "number" == typeof t || p.test(t) ? +t : -1, n = null == n ? b : n, t > -1 && t % 1 == 0 && n > t;
	  }function i(t) {
	    return "number" == typeof t && t > -1 && t % 1 == 0 && b >= t;
	  }function c(t) {
	    for (var n = f(t), e = n.length, r = e && t.length, o = !!r && i(r) && (d(t) || s(t)), c = -1, a = []; ++c < e;) {
	      var l = n[c];(o && u(l, r) || v.call(t, l)) && a.push(l);
	    }return a;
	  }function a(t) {
	    var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	  }function f(t) {
	    if (null == t) return [];a(t) || (t = Object(t));var n = t.length;n = n && i(n) && (d(t) || s(t)) && n || 0;for (var e = t.constructor, r = -1, o = "function" == typeof e && e.prototype === t, c = Array(n), f = n > 0; ++r < n;) {
	      c[r] = r + "";
	    }for (var l in t) {
	      f && u(l, n) || "constructor" == l && (o || !v.call(t, l)) || c.push(l);
	    }return c;
	  }var l = e(27),
	      s = e(28),
	      d = e(20),
	      p = /^\d+$/,
	      y = Object.prototype,
	      v = y.hasOwnProperty,
	      h = l(Object, "keys"),
	      b = 9007199254740991,
	      g = r("length"),
	      m = h ? function (t) {
	    var n = null == t ? void 0 : t.constructor;return "function" == typeof n && n.prototype === t || "function" != typeof t && o(t) ? c(t) : a(t) ? h(t) : [];
	  } : c;t.exports = m;
	}, function (t, n) {
	  function e(t) {
	    return !!t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
	  }function r(t, n) {
	    var e = null == t ? void 0 : t[n];return i(e) ? e : void 0;
	  }function o(t) {
	    return u(t) && d.call(t) == c;
	  }function u(t) {
	    var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	  }function i(t) {
	    return null == t ? !1 : o(t) ? p.test(l.call(t)) : e(t) && a.test(t);
	  }var c = "[object Function]",
	      a = /^\[object .+?Constructor\]$/,
	      f = Object.prototype,
	      l = Function.prototype.toString,
	      s = f.hasOwnProperty,
	      d = f.toString,
	      p = RegExp("^" + l.call(s).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");t.exports = r;
	}, function (t, n) {
	  (function (n) {
	    function e(t) {
	      return function (n) {
	        return null == n ? void 0 : n[t];
	      };
	    }function r(t) {
	      return u(t) && v.call(t, "callee") && (!b.call(t, "callee") || h.call(t) == s);
	    }function o(t) {
	      return null != t && !("function" == typeof t && i(t)) && c(g(t));
	    }function u(t) {
	      return f(t) && o(t);
	    }function i(t) {
	      var n = a(t) ? h.call(t) : "";return n == d || n == p;
	    }function c(t) {
	      return "number" == typeof t && t > -1 && t % 1 == 0 && l >= t;
	    }function a(t) {
	      var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	    }function f(t) {
	      return !!t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
	    }var l = 9007199254740991,
	        s = "[object Arguments]",
	        d = "[object Function]",
	        p = "[object GeneratorFunction]",
	        y = n.Object.prototype,
	        v = y.hasOwnProperty,
	        h = y.toString,
	        b = y.propertyIsEnumerable,
	        g = e("length");t.exports = r;
	  }).call(n, function () {
	    return this;
	  }());
	}, function (t, n, e) {
	  function r(t) {
	    return i(function (n, e) {
	      var r = -1,
	          i = null == n ? 0 : e.length,
	          c = i > 2 ? e[i - 2] : void 0,
	          a = i > 2 ? e[2] : void 0,
	          f = i > 1 ? e[i - 1] : void 0;for ("function" == typeof c ? (c = o(c, f, 5), i -= 2) : (c = "function" == typeof f ? f : void 0, i -= c ? 1 : 0), a && u(e[0], e[1], a) && (c = 3 > i ? void 0 : c, i = 1); ++r < i;) {
	        var l = e[r];l && t(n, l, c);
	      }return n;
	    });
	  }var o = e(30),
	      u = e(31),
	      i = e(32);t.exports = r;
	}, function (t, n) {
	  function e(t, n, e) {
	    if ("function" != typeof t) return r;if (void 0 === n) return t;switch (e) {case 1:
	        return function (e) {
	          return t.call(n, e);
	        };case 3:
	        return function (e, r, o) {
	          return t.call(n, e, r, o);
	        };case 4:
	        return function (e, r, o, u) {
	          return t.call(n, e, r, o, u);
	        };case 5:
	        return function (e, r, o, u, i) {
	          return t.call(n, e, r, o, u, i);
	        };}return function () {
	      return t.apply(n, arguments);
	    };
	  }function r(t) {
	    return t;
	  }t.exports = e;
	}, function (t, n) {
	  function e(t) {
	    return function (n) {
	      return null == n ? void 0 : n[t];
	    };
	  }function r(t) {
	    return null != t && i(l(t));
	  }function o(t, n) {
	    return t = "number" == typeof t || a.test(t) ? +t : -1, n = null == n ? f : n, t > -1 && t % 1 == 0 && n > t;
	  }function u(t, n, e) {
	    if (!c(e)) return !1;var u = typeof n === "undefined" ? "undefined" : _typeof(n);if ("number" == u ? r(e) && o(n, e.length) : "string" == u && n in e) {
	      var i = e[n];return t === t ? t === i : i !== i;
	    }return !1;
	  }function i(t) {
	    return "number" == typeof t && t > -1 && t % 1 == 0 && f >= t;
	  }function c(t) {
	    var n = typeof t === "undefined" ? "undefined" : _typeof(t);return !!t && ("object" == n || "function" == n);
	  }var a = /^\d+$/,
	      f = 9007199254740991,
	      l = e("length");t.exports = u;
	}, function (t, n) {
	  function e(t, n) {
	    if ("function" != typeof t) throw new TypeError(r);return n = o(void 0 === n ? t.length - 1 : +n || 0, 0), function () {
	      for (var e = arguments, r = -1, u = o(e.length - n, 0), i = Array(u); ++r < u;) {
	        i[r] = e[n + r];
	      }switch (n) {case 0:
	          return t.call(this, i);case 1:
	          return t.call(this, e[0], i);case 2:
	          return t.call(this, e[0], e[1], i);}var c = Array(n + 1);for (r = -1; ++r < n;) {
	        c[r] = e[r];
	      }return c[n] = i, t.apply(this, c);
	    };
	  }var r = "Expected a function",
	      o = Math.max;t.exports = e;
	}, function (t, n) {
	  "use strict";
	  function e(t) {
	    return function (n) {
	      return function (n) {
	        return function (e) {
	          t.$$phase ? n(e) : t.$apply(n(e));
	        };
	      };
	    };
	  }n.__esModule = !0, n["default"] = e;
	}]);

/***/ }
/******/ ]);