/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const body = document.querySelector(\"body\");\r\nconst sidebar = body.querySelector(\".sidebar\");\r\nconst toggle = body.querySelector(\".toggle\");\r\nconst searchBtn = body.querySelector(\".search-box\");\r\n\r\ntoggle.addEventListener(\"click\", () => {\r\n    sidebar.classList.toggle(\"close\");\r\n});\r\n\r\nwindow.addEventListener(\"load\", () => {\r\n    const loader = document.querySelector(\".loading\");\r\n    loader.classList.add(\"loading-hidden\");\r\n    loader.addEventListener(\"transitioned\", () => {\r\n        document.body.removeChild(\"loading\");\r\n    });\r\n});\n\n//# sourceURL=webpack://nurse-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;