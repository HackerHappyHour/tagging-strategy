const core = require('@actions/core')

exports.getIdentifier = (identifier, raw) => {
  var single = new RegExp('\\W+(' + `${identifier}` + ')$')
  var multi = new RegExp('\\W+(' + `${identifier[0]}`+ '.*' + `${identifier[identifier.length - 1]}`+')$')

  switch (identifier.length){
    case 0: 
      return ''
      break;
    case 1:
      return raw.slice(raw.search(single), raw.length)
      break;
    default:
      return raw.slice(raw.search(multi), raw.length)
  }
}

exports.getInputBoolean = (input) => {
  let boolTest = RegExp('true', 'i')
  return boolTest.test(input)
}

exports.tagsReducer = (tags,tag) => {
  let isConditionalTag = tag.search('::')
  // tag has condition specified, so only return 
  //the tag if the condition is true
  if(isConditionalTag > -1){
    if(/true/i.test(tag)){
      return [...tags, tag.substr(0, isConditionalTag)]
    } else {
      return tags
    }
  } else {
    return [...tags, tag]
  }
}

exports.getInputList = (list) => {
    if (list.length < 1) {
      return []
    }

    return list
      .split(/\r?\n/)
      .filter(x => x)
      .reduce((acc, line) => acc.concat(line.split(',').filter(x => x)).map(pat => pat.trim()), [])
}

exports.imageNameReducer = (imageName) => {
  return (tags, tag) => {
    return imageName ? [...tags, `${imageName}:${tag.tag}`] : [...tags, tag.tag]
  }

}
