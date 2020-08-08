const core = require('@actions/core')
const github = require('@actions/github')

try {
  console.log(github.context)

  // get tag-pattern-matcher
  const pattern = core.getInput('pattern')
  const tag = core.getInput('tag_name')

  core.info(`Parsing ${tag} with ${pattern} tag for this run`)

  // this will be a function to parse the input against the event payload
  // to produce a refined tag
  const strategy_tag = 'latest'

  // finally, return output
  core.setOutput("strategy_tag", strategy_tag)

} catch (error) {
  // do error handling stuff
  core.error(error)
  core.setFailed('CHIEF screwed up somewhere')
}
