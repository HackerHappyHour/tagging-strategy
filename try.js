const {taggingStrategy} = require('./src/taggingStrategy')

const strategy = {
  latest: true,
  tagName: '1.7.3',
  inputTags: '%X%,%X.Y%,%X.Y.Z%'
}

console.log(taggingStrategy(strategy))