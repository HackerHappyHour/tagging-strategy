const core = require('@actions/core')
const github = require('@actions/github')

try {
  // get tag-pattern-matcher
  const pattern = core.getInput('pattern')
  console.log(`Using the ${pattern} tag for this run`)

  // this will be a function to parse the input against the event payload
  // to produce a refined tag
  const tag = 'latest'

  // finally, return output
  core.setOutput("tag", tag)
} catch (error) {
  // do error handling stuff
}
