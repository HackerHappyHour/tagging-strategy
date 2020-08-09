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

const matcher = /(%(?<strategy>(?<major>x?)\.?(?<minor>y?)\.?(?<patch>z?))%)(?<prerelease>.*)/ig

exports.parseTag = (pattern, tag) => {
  if (pattern === 'latest') return 'latest'

  let matches = pattern.matchAll(matcher)

    if(pattern.indexOf('%') > 2){
      throw `pattern ${pattern} has too many %'s`
    } else {
      try {
          // if 'tag' is valid, attempt to parse it
        // otherwise error: value is not valid or cannot be coerced
        var parsedTag = s.parse(tag, {includePrerelease: true})
        if (!parsedTag){
          parsedTag = s.parse(s.valid(s.coerce(tag)))
          if (!parsedTag) throw errorInvalidTag.error
        } 

        var Tag = {}
        var modifier
        for(let match of matches){
          let strategy_tag
          const {strategy, prerelease} = match.groups
          const {major, minor, patch} = parsedTag
          Tag.rawTag = tag
          Tag.pattern = pattern
          Tag.prerelease = prerelease
          Tag.major = major
          Tag.minor = minor
          Tag.patch = patch
          strategy_tag = strategy.replace(/x/i, major)  
          strategy_tag = strategy_tag.replace(/y/i, minor)
          strategy_tag = strategy_tag.replace(/z/i, patch)
          Tag.version = strategy_tag
          Tag.modifier = prerelease
        }

        return {
          ...Tag,
          tag: `${Tag.version}${Tag.modifier}` 
        }
      } catch (error) {
        return {error: error}
      }

    } 

}

exports.replacers = replacers
exports.errorInvalidTag = errorInvalidTag
