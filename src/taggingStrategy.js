const {parseTag, parseInputList} = require('./parser')

exports.taggingStrategy = ({inputTags, latest, tagName}) => {
  try {
    let rawInputTags = parseInputList(inputTags)
    let outputTags = rawInputTags
      .map(tag => parseTag(tag, tagName))
      .reduce((tags,tag) => {
        return [...tags, tag.tag]
        },
      [])
    
    if(latest) outputTags.push('latest')
    return outputTags.join(',')

  } catch (error) {
    return `tagging-strategy was unable to parse your tags...\n${error}`
  }

}