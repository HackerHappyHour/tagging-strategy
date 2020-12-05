const {parseTag} = require('./parseTag')
const {conditionalTagsReducer, imageNameReducer, getInputList} = require('./utils')

exports.taggingStrategy = ({inputTags, latest, tagName, imageName, extraTags}) => {
  try {
    let outputTags = getInputList(inputTags)
      .reduce(conditionalTagsReducer, [])
      .map(strategy => {
        return parseTag(strategy, tagName)
      })
      .reduce(imageNameReducer(imageName), [])
    
    if (extraTags) {
      // reduce conditionalTags for extraTags
      // reduce imageNames for extraTags
      // push the extraTag to outputTags array 
      getInputList(extraTags)
        .reduce(conditionalTagsReducer, [])
        .reduce(imageNameReducer(imageName),[])
        .forEach(tag => outputTags.push(tag))
    }

    if(/true/i.test(latest)){
      imageName ? outputTags.push(`${imageName}:latest`) : outputTags.push('latest')
    }
    return outputTags.join(',')

  } catch (error) {
    return `tagging-strategy was unable to parse your tags...\n${error}`
  }

}
