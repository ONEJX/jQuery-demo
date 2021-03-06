// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"ZC2/":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.$ = function (selectorOrArray) {
    var elements = void 0;
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray;
    }
    return {
        //????????????
        find: function find(selector) {
            var arr = [];
            for (var i = 0; i < elements.length; i++) {
                var newElements = Array.from(elements[i].querySelectorAll(selector));
                arr = arr.concat(newElements);
            }
            return $(arr);
        },

        //????????????
        each: function each(fn) {
            for (var i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i);
            }
            return this;
        },

        //???????????????
        parent: function parent() {
            var arr = [];
            this.each(function (node) {
                if (arr.indexOf(node.parentNode) === -1) {
                    arr.push(node.parentNode);
                }
            });
            return $(arr);
        },

        //???????????????
        children: function children() {
            var arr = [];
            this.each(function (node) {
                arr.push.apply(arr, _toConsumableArray(node.children));
            });
            return $(arr);
        },

        //??????????????????????????????????????????
        siblings: function siblings() {
            return $(this.parent().children().print().filter(function (n) {
                return n !== elements[0];
            }));
        },

        //????????????????????????
        index: function index() {
            var arr = this.parent().children().print();
            var i = void 0;
            for (i = 0; i < arr.length; i++) {
                if (elements[0] === arr[i]) {
                    break;
                }
            }
            return i;
        },

        //????????????
        next: function next() {
            var index = this.index();
            var arr = this.parent().children().print();
            return arr[index + 1];
        },

        //????????????
        prev: function prev() {
            var index = this.index();
            var arr = this.parent().children().print();
            return arr[index - 1];
        },

        //??????className
        addClass: function addClass(className) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.add(className);
            }
            return this;
        },
        print: function print() {
            return elements;
        }
    };
};
},{}]},{},["ZC2/"], null)
//# sourceMappingURL=jquery.b736623e.map