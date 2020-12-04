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

exports.conditionalTagFilter = (tag) => {
  const isConditionalTag = /(?<=::)('true'|true|'false'|false)/ig
  if (isConditionalTag.test(tag)){
    return tag.match(isConditionalTag)
  }
  return tag
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
