/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/print.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers/window.js":
/*!*******************************!*\
  !*** ./src/helpers/window.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs-jetpack */ "fs-jetpack");
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_jetpack__WEBPACK_IMPORTED_MODULE_1__);
// This helper remembers the size and position of your windows (and restores
// them in that place after app relaunch).
// Can be used for more than one window, just construct many
// instances of it and give each different name.


/* harmony default export */ __webpack_exports__["default"] = ((name, options) => {
  const userDataDir = fs_jetpack__WEBPACK_IMPORTED_MODULE_1___default.a.cwd(electron__WEBPACK_IMPORTED_MODULE_0__["app"].getPath("userData"));
  const stateStoreFile = `window-state-${name}.json`;
  const defaultSize = {
    width: options.width,
    height: options.height
  };
  let state = {};
  let win;

  const restore = () => {
    let restoredState = {};

    try {
      restoredState = userDataDir.read(stateStoreFile, "json");
    } catch (err) {// For some reason json can't be read (might be corrupted).
      // No worries, we have defaults.
    }

    return Object.assign({}, defaultSize, restoredState);
  };

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  };

  const windowWithinBounds = (windowState, bounds) => {
    return windowState.x >= bounds.x && windowState.y >= bounds.y && windowState.x + windowState.width <= bounds.x + bounds.width && windowState.y + windowState.height <= bounds.y + bounds.height;
  };

  const resetToDefaults = () => {
    const bounds = electron__WEBPACK_IMPORTED_MODULE_0__["screen"].getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    });
  };

  const ensureVisibleOnSomeDisplay = windowState => {
    const visible = electron__WEBPACK_IMPORTED_MODULE_0__["screen"].getAllDisplays().some(display => {
      return windowWithinBounds(windowState, display.bounds);
    });

    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }

    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }

    userDataDir.write(stateStoreFile, state, {
      atomic: true
    });
  };

  state = ensureVisibleOnSomeDisplay(restore());
  win = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"](Object.assign({}, options, state));
  win.on("close", saveState);
  return win;
});

/***/ }),

/***/ "./src/print.js":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/window */ "./src/helpers/window.js");
/* harmony import */ var node_html_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-html-parser */ "node-html-parser");
/* harmony import */ var node_html_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_html_parser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsx_to_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsx-to-html */ "jsx-to-html");
/* harmony import */ var jsx_to_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsx_to_html__WEBPACK_IMPORTED_MODULE_2__);


const {
  app,
  BrowserWindow,
  remote
} = __webpack_require__(/*! electron */ "electron");

const ThermalPrinter = __webpack_require__(/*! node-thermal-printer */ "node-thermal-printer").printer;

const PrinterTypes = __webpack_require__(/*! node-thermal-printer */ "node-thermal-printer").types;



const fs = __webpack_require__(/*! fs */ "fs");

const createHTML = __webpack_require__(/*! create-html */ "create-html");



const path = __webpack_require__(/*! path */ "path");

exports.print = (billHTML, barHTML, cookerHTML, printers, callback) => {
  var html = createHTML({
    css: 'stylePrint.css',
    body: billHTML
  });
  const dirPathFolder = path.join(process.cwd(), '/print');

  try {
    if (!fs.existsSync(dirPathFolder)) {
      fs.mkdirSync(dirPathFolder);
    }
  } catch (err) {
    console.log(err);
  }

  fs.writeFile(dirPathFolder + '\\bill.html', html, function (err) {
    if (err) {
      console.log(err);
    } else {
      let win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
      });
      win.on('closed', () => {
        win = null;
      });
      win.loadURL(dirPathFolder + '\\bill.html');
      win.webContents.on('did-finish-load', () => {
        setTimeout(function () {
          win.webContents.print({
            silent: true,
            printBackground: true,
            deviceName: 'bill1'
          }, function (err) {
            win.webContents.print({
              silent: true,
              printBackground: true,
              deviceName: 'bill1'
            }, function (err) {});
          });
        }, 1000);
      });

      if (barHTML && barHTML != 'none') {
        var barHTMLTmp = createHTML({
          css: 'stylePrint.css',
          body: barHTML
        });
        fs.writeFile(dirPathFolder + '\\bar.html', barHTMLTmp, function (err) {
          if (err) {
            console.log(err);
          } else {
            let win1 = new BrowserWindow({
              width: 800,
              height: 600,
              show: false
            });
            win1.on('closed', () => {
              win1 = null;
            });
            win1.loadURL(dirPathFolder + '\\bar.html');
            win1.webContents.on('did-finish-load', () => {
              setTimeout(function () {
                win1.webContents.print({
                  silent: true,
                  printBackground: true,
                  deviceName: 'bill2'
                }, function (err) {});
              }, 1000);
            });
          }
        });
      }

      if (cookerHTML && cookerHTML != 'none') {
        var cookerHTMLTmp = createHTML({
          css: 'stylePrint.css',
          body: cookerHTML
        });
        fs.writeFile(dirPathFolder + '\\cooker.html', cookerHTMLTmp, function (err) {
          if (err) {
            console.log(err);
          } else {
            let win2 = new BrowserWindow({
              width: 800,
              height: 600,
              show: false
            });
            win2.on('closed', () => {
              win2 = null;
            });
            win2.loadURL(dirPathFolder + '\\cooker.html');
            win2.webContents.on('did-finish-load', () => {
              setTimeout(function () {
                win2.webContents.print({
                  silent: true,
                  printBackground: true,
                  deviceName: 'bill3'
                }, function (err) {});
              }, 1000);
            });
          }
        });
      }
    }
  });
};

/***/ }),

/***/ "create-html":
/*!******************************!*\
  !*** external "create-html" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("create-html");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "fs-jetpack":
/*!*****************************!*\
  !*** external "fs-jetpack" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-jetpack");

/***/ }),

/***/ "jsx-to-html":
/*!******************************!*\
  !*** external "jsx-to-html" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsx-to-html");

/***/ }),

/***/ "node-html-parser":
/*!***********************************!*\
  !*** external "node-html-parser" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-html-parser");

/***/ }),

/***/ "node-thermal-printer":
/*!***************************************!*\
  !*** external "node-thermal-printer" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-thermal-printer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=print.js.map