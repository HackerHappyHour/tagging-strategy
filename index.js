const core = require('@actions/core')
const github = require('@actions/github')
const {taggingStrategy} = require('./src/taggingStrategy')
const {getInputBoolean} = require('./src/utils')

const inputTags = core.getInput('tags')
const tagName = core.getInput('tag_name')
const latest = getInputBoolean('latest')
const imageName = core.getInput('image_name')

try {
  core.setOutput('tags', taggingStrategy({inputTags, tagName, latest, imageName}))
} catch (error) {
  core.error(error)
  core.setFailed(`tagging-strategy was unable to parse your tags...\n${error}`)
}
