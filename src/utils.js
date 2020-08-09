exports.identifierRegex = (identifier) => {
  var replace = '\\W+(' + `${identifier[0]}`+ '.*' + `${identifier[identifier.length - 1]}`+')$'
  return new RegExp(replace)
  
}

exports.getIdentifier = (identifier, raw) => {
  if(!identifier) return ''
  switch (identifier.length){
    case 1:
      return identifier
      break;
    default:
      return raw.slice(
        raw.search(identifierRegex(identifier)),
        raw.length
      )
  }
}
