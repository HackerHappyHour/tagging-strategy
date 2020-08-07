const core = require('@actions/core')
const github = require('@actions/github')

try {
  const context = JSON.stringify(github.context)
  console.log(context)

  // get tag-pattern-matcher
  const pattern = core.getInput('pattern')
  const payloadKey = core.getInput('payload_key')
  console.log(`Using the ${pattern} tag for this run`)

  // this will be a function to parse the input against the event payload
  // to produce a refined tag

  // finally, return output
  core.setOutput("strategy_tag", 'latest')
} catch (error) {
  // do error handling stuff
  console.error(error)
  core.setFailed('CHIEF screwed up somewhere')
}
