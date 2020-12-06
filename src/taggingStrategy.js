const {parseTag} = require('./parseTag')
const {tagsReducer, imageNameReducer, getInputList} = require('./utils')

exports.taggingStrategy = ({inputTags, tagName, imageName, extraTags}) => {
  try{
    let outputTags = getInputList(inputTags)
      .reduce(tagsReducer, [])
      .map(strategy => parseTag(strategy, tagName))
      .reduce(imageNameReducer(imageName), [])

    if (extraTags) {
      // reduce conditionalTags for extraTags
      // reduce imageNames for extraTags
      // push the extraTag to outputTags array 
      getInputList(extraTags)
        .reduce(tagsReducer, [])
        .map(extraTag => imageName ? `${imageName}:${extraTag}`: `${extraTag}`)
        .forEach(extraTag => outputTags.push(extraTag))
        
    }

    return outputTags.join(',')
  } catch (error) {
    throw error.message
  }
  let outputTags = getInputList(inputTags)

}
