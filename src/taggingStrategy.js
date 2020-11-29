const {parseTag, parseInputList} = require('./parser')

exports.taggingStrategy = ({inputTags, latest, tagName, imageName}) => {
  try {
    let rawInputTags = parseInputList(inputTags)
    let outputTags = rawInputTags
      .map(tag => parseTag(tag, tagName, imageName))
      .reduce((tags,tag) => {
        return imageName ? [...tags, `${imageName}:${tag.tag}`] : [...tags, tag.tag]
      }, [])
    
    if(latest !== 'false'){
      imageName ? outputTags.push(`${imageName}:latest`) : outputTags.push('latest')
    }
    return outputTags.join(',')

  } catch (error) {
    return `tagging-strategy was unable to parse your tags...\n${error}`
  }

}
