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

/***/ 300:
/***/ (function(__unusedmodule, exports) {

exports.getIdentifier = (identifier, raw) => {
  if(!identifier) return ''
  var single = new RegExp('\\W+(' + `${identifier}` + ')$')
  var multi = new RegExp('\\W+(' + `${identifier[0]}`+ '.*' + `${identifier[identifier.length - 1]}`+')$')

  switch (identifier.length){
    case 1:
      return raw.slice(raw.search(single), raw.length)
      break;
    default:
      return raw.slice(raw.search(multi), raw.length)
  }
}


/***/ }),

/***/ 306:
/***/ (function(module) {

module.exports = eval("require")("semver");


/***/ }),

/***/ 311:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 510:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

const s = __webpack_require__(306)
const github = __webpack_require__(602)
const core = __webpack_require__(311)
const {getIdentifier} = __webpack_require__(300)
const {invalidTag, tooManyPatterns} = __webpack_require__(512)

const matcher = /(%(?<strategy>(?<major>x?)\.?(?<minor>y?)\.?(?<patch>z?))%)(?<variant>.*)/ig

exports.parseTag = (pattern, tag) => {
  if (pattern === 'latest') return {tag: 'latest'}
  if (pattern.indexOf('%') > 2) return {error: tooManyPatterns}

  let Tag = {}
  let matches = pattern.matchAll(matcher)

    // if 'tag' is valid, attempt to parse it
  // otherwise error: value is not valid or cannot be coerced
  var parsedTag = s.parse(tag, {includePrerelease: true})
  if (!parsedTag){
    parsedTag = s.parse(s.valid(s.coerce(tag)))
    if (!parsedTag) return {error: invalidTag}
  } 

  const {major, minor, patch} = parsedTag
  const identifier = getIdentifier(parsedTag.prerelease, parsedTag.raw) 

  for(let match of matches){
    const {major: maj, minor:min, patch:fix, strategy, variant} = match.groups
    Tag = {...Tag, strategy, variant, identifier, maj, min, fix, major, minor, patch}

    let output = strategy
    if(maj){output = output.replace(/x/ig, major)}
    if(min){output = output.replace(/y/ig, minor)}
    if(fix){output = output.replace(/z/ig, patch)}
    Tag.tag = `${output}${identifier}${variant}`

  }
  core.info(JSON.stringify(Tag))  
  return Tag
}


/***/ }),

/***/ 512:
/***/ (function(__unusedmodule, exports) {


exports.invalidTag = {message: 'tag_name value is not valid or cannot be coerced'}
exports.tooManyPatterns = {message: 'only one pattern allowed per strategy'}


/***/ }),

/***/ 602:
/***/ (function(module) {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 840:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(311)
const github = __webpack_require__(602)
const {parseTag} = __webpack_require__(510)

try {
  core.debug(JSON.stringify(github.context))

  const strategy = core.getInput('pattern')
  const release = core.getInput('tag_name')

  core.info(`Parsing ${release} with ${strategy} tag for this run`)

  const {error, tag} = parseTag(strategy, release)
  if (error) throw error.message
  core.info(`tag output: ${tag}`)
  core.setOutput("tag", tag)

} catch (error) {
  core.error(error)
  core.setFailed(`Tagging Strategy was unable to parse your tag...\n${error}`)
}


/***/ })

/******/ });