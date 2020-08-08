const core = require('@actions/core')
const github = require('@actions/github')

try {
  console.log(github.context)

  // get tag-pattern-matcher
  const pattern = core.getInput('pattern')
  const tag = core.getInput('tag_name')
  console.log(`Parsing with ${pattern} tag for this run`)
  console.log('tag', tag)

  // this will be a function to parse the input against the event payload
  // to produce a refined tag

  // finally, return output
  core.setOutput("strategy_tag", 'latest')
} catch (error) {
  // do error handling stuff
  console.error(error)
  core.setFailed('CHIEF screwed up somewhere')
}
