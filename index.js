const core = require('@actions/core')
const {taggingStrategy} = require('./src/taggingStrategy')
const {getInputBoolean} = require('./src/utils')

const inputTags = core.getInput('tags')
const tagName = core.getInput('tag_name')
const imageName = core.getInput('image_name')
const extraTags = core.getInput('extra_tags') || false

try {
  core.setOutput('tags', taggingStrategy({inputTags, tagName, imageName, extraTags}))
} catch (error) {
  core.error(error)
}
