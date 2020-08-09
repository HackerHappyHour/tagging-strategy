const s = require('semver')
const github = require('@actions/github')

const errors = {
  invalidTag: {message: 'tag_name value is not valid or cannot be coerced'},
  tooManyPatterns: {message: 'only one pattern allowed per strategy'}
}

const matcher = /(%(?<strategy>(?<major>x?)\.?(?<minor>y?)\.?(?<patch>z?))%)(?<variant>.*)/ig

exports.parseTag = (pattern, tag) => {
  if (pattern === 'latest') return {tag: 'latest'}
  if (pattern.indexOf('%') > 2) return {error: errors.tooManyPatterns}

  let Tag = {}
  let matches = pattern.matchAll(matcher)

    // if 'tag' is valid, attempt to parse it
  // otherwise error: value is not valid or cannot be coerced
  var parsedTag = s.parse(tag, {includePrerelease: true})
  if (!parsedTag){
    parsedTag = s.parse(s.valid(s.coerce(tag)))
    if (!parsedTag) return {error: errors.invalidTag}
  } 

  const {major, minor, patch} = parsedTag
  const identifier = getIdentifier(parsedTag.prerelease, parsedTag.raw) 

  for(let match of matches){
    const {strategy, variant} = match.groups
    Tag = {
      ...Tag, 
      strategy, 
      variant, 
      major: match.groups.major, 
      minor: match.groups.minor, 
      patch: match.groups.minor, 
      identifier
    }
    let strategyTag = strategy
    if(Tag.major) strategyTag = strategyTag.replace(/x/g, Tag.major)
    if (Tag.minor) strategyTag = strategyTag.replace(/y/g, Tag.minor)
    if (Tag.patch) strategyTag = strategyTag.replace(/z/g, Tag.patch)
    Tag.tag = `${strategyTag}${identifier}${variant}`

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

exports.errors = errors
