const {parseTag} = require('../src/parseTag')
const {parseTagScenarios} = require('./__data__/parser')

describe('parseTag',()=>{
  test.each(parseTagScenarios)(
    '.parseTag("%s", "%s") returns %s', 
    (strategy, release, expected) => {
    let {tag, error} = parseTag(strategy, release)
    expect(tag).toMatch(expected)
    expect(error).toBeUndefined()
  })
})
