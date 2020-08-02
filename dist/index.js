module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(840);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 306:
/***/ (function(module) {

module.exports = eval("require")("semver");


/***/ }),

/***/ 311:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 602:
/***/ (function(module) {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 840:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(311)
const github = __webpack_require__(602)
const semver = __webpack_require__(306)

try {
  const payload = JSON.stringify(github.context.payload)
  console.log(payload)
  console.log(semver)

  // get tag-pattern-matcher
  const pattern = core.getInput('pattern')
  console.log(`Using the ${pattern} tag for this run`)

  // this will be a function to parse the input against the event payload
  // to produce a refined tag
  const tag = 'latest'

  // finally, return output
  core.setOutput("tag", tag)
} catch (error) {
  // do error handling stuff
  core.setFailed('CHIEF screwed up somewhere')
}


/***/ })

/******/ });