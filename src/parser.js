const s = require('semver')
const github = require('@actions/github')

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

  const {major, minor, patch} = parsedTag
  const identifier = getIdentifier(parsedTag.prerelease, parsedTag.raw) 

  for(let match of matches){
    const {strategy, variant} = match.groups
    Tag = {...Tag, strategy, variant, major, minor, patch, identifier}

  }

  return Tag
}

function getIdentifier(identifier, raw){
  if(!identifier) return ''
  switch (identifier.length){
    case 1:
      return identifier
      break;
    default:
      return raw.slice(
        raw.search(identifierRegex(identifier)),
        raw.length
      )
  }
}

function identifierRegex(identifier){
  var replace = '\\W+(' + `${identifier[0]}`+ '.*' + `${identifier[identifier.length - 1]}`+')$'
  return new RegExp(replace)
  
}

exports.replacers = replacers
exports.errorInvalidTag = errorInvalidTag
