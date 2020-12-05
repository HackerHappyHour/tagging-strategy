const {parseTag} = require('./parseTag')
const {conditionalTagsReducer, getInputList} = require('./utils')

exports.taggingStrategy = ({inputTags, latest, tagName, imageName}) => {
  try {
    let outputTags = getInputList(inputTags)
      .reduce(conditionalTagsReducer, [])
      .map(strategy => {
        return parseTag(strategy, tagName)
      })
      .reduce((tags,tag) => {
        return imageName ? [...tags, `${imageName}:${tag.tag}`] : [...tags, tag.tag]
      }, [])
    
    if(/true/i.test(latest)){
      imageName ? outputTags.push(`${imageName}:latest`) : outputTags.push('latest')
    }
    return outputTags.join(',')

  } catch (error) {
    return `tagging-strategy was unable to parse your tags...\n${error}`
  }

}
