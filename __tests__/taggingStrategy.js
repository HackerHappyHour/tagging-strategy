const {taggingStrategy} = require('../src/taggingStrategy')
const {parseTag, getInputList} = require('../src/parser')

const testTable = [
  ['%X%,%X.Y%,%X.Y.Z%', '1.0.0', '1,1.0,1.0.0']
]

describe('outputs',() => {
  test.each(testTable)('test strategy %s given tag_name %s', (inputTags, tagName, expectedOutput) => {
    let strategy = {
      tagName: tagName,
      latest: false,
      inputTags: inputTags
    }
    let outputTags = taggingStrategy(strategy)
    expect(outputTags).toMatch(expectedOutput)
  })
})