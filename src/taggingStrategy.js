const {parseTag, parseInputList, conditionalTagFilter} = require('./parser')

exports.taggingStrategy = ({inputTags, latest, tagName, imageName}) => {
  try {
    let rawInputTags = parseInputList(inputTags)
    let outputTags = rawInputTags
      .filter(conditionalTagFilter)
      .map(tag => parseTag(tag, tagName, imageName))
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
