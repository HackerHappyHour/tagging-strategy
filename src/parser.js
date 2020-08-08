const parse = require('semver/functions/parse')
const valid = require('semver/functions/valid')
const github = require('@actions/github')

const delimiter = '%'
const replacers = {
  X: 'major',
  Y: 'minor',
  Z: 'patch'
}

exports.parseTag = (strategy, tag) => {
  if (strategy = 'latest') return 'latest'

  try {
    // if 'tag' is valid, attempt to parse it
    // otherwise error: value is not valid or cannot be coerced
    if (!valid(tag)){

    } else {
      throw 'value is not valid or cannot be coerced'
    }

  } catch (error) {
    return {error: error}
  }


}
