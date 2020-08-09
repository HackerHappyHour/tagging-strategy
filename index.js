const core = require('@actions/core')
const github = require('@actions/github')
const {parseTag} = require('./src/parser')

try {
  core.debug(JSON.stringify(github.context))

  const strategy = core.getInput('pattern')
  const release = core.getInput('tag_name')

  core.info(`Parsing ${release} with ${strategy} tag for this run`)

  const {error, tag} = parseTag(pattern, inputTag)
  if (error) throw error.message
  core.info(`tag output: ${tag}`)
  core.setOutput("tag", tag)

} catch (error) {
  core.error(error)
  core.setFailed(`Tagging Strategy was unable to parse your tag...\n${error}`)
}
