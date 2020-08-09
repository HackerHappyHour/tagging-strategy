const s = require('semver')
const github = require('@actions/github')

const delimiter = '%'
const replacers = {
  major: 'x',
  minor: 'y',
  patch: 'z'
}

const errorInvalidTag = {error: 'value is not valid or cannot be coerced'}
const errorTooManyPatterns = {error: 'only one pattern allowed per strategy'}

const matcher = /(%(?<strategy>(?<major>x?)\.?(?<minor>y?)\.?(?<patch>z?))%)(?<variant>.*)/ig

exports.parseTag = (pattern, tag) => {
  if (pattern === 'latest') return {tag: 'latest'}
  if (pattern.indexOf('%') > 2) {error: errorTooManyPatterns}

  let Tag = {}
  let matches = pattern.matchAll(matcher)

    // if 'tag' is valid, attempt to parse it
  // otherwise error: value is not valid or cannot be coerced
  var parsedTag = s.parse(tag, {includePrerelease: true})
  if (!parsedTag){
    parsedTag = s.parse(s.valid(s.coerce(tag)))
    if (!parsedTag) return errorInvalidTag.error
  } 

  for(let match of matches){
    const {strategy, variant} = match.groups
    const {major, minor, patch} = parsedTag
    Tag = {...Tag, strategy, variant, major, minor, patch}
  }

  return Tag
}

exports.replacers = replacers
exports.errorInvalidTag = errorInvalidTag
