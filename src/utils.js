exports.getIdentifier = (identifier, raw) => {
  if(!identifier) return ''
  var single = new RegExp('\\W+(' + `${identifier}` + ')$')
  var multi = new RegExp('\\W+(' + `${identifier[0]}`+ '.*' + `${identifier[identifier.length - 1]}`+')$')

  switch (identifier.length){
    case 1:
      return raw.slice(raw.search(single), raw.length)
      break;
    default:
      return raw.slice(
        raw.search(multi),
        raw.length
      )
  }
}
