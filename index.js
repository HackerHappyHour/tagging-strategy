const core = require('@actions/core')
const github = require('@actions/github')
const {parseTag} = require('./src/parser')

try {
  core.debug(JSON.stringify(github.context))

  // get tag-pattern-matcher
  const pattern = core.getInput('pattern')
  const inputTag = core.getInput('tag')

  core.info(`Parsing ${tag} with ${pattern} tag for this run`)

  // this will be a function to parse the input against the event payload
  // to produce a refined tag
  const {error, tag} = parseTag(pattern, tag)
  if (error) throw error.message
  // finally, return output
  core.setOutput("tag", tag)

} catch (error) {
  // do error handling stuff
  core.error(error)
  core.setFailed(`Tagging Strategy was unable to parse your tag...\n${error}`)
}
