const {parseTag} = require('./parseTag')
const {extraTagsReducer, conditionalTagsReducer, imageNameReducer, getInputList} = require('./utils')

exports.taggingStrategy = ({inputTags, tagName, imageName, extraTags}) => {
  try {
    let outputTags = getInputList(inputTags)
      .reduce(conditionalTagsReducer, [])
      .map(strategy => parseTag(strategy, tagName))
      .reduce(imageNameReducer(imageName), [])

    if (extraTags) {
      // reduce conditionalTags for extraTags
      // reduce imageNames for extraTags
      // push the extraTag to outputTags array 
      getInputList(extraTags)
        .reduce(extraTagsReducer, [])
        .reduce(imageNameReducer(imageName),[])
        .forEach(tag => outputTags.push(tag))
    }

    return outputTags.join(',')
  }
  catch (error) {
    return `Unable to parse your tagging strategy...\n${error}`
  }

}
