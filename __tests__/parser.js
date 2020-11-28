const {parseTag, parseInputList} = require('../src/parser')
const {invalidTag} = require('../src/errors')
const {parseTagScenarios, parseInputListScenarios} = require('./__data__/parser')

describe('parseTag',()=>{
  test.each(parseTagScenarios)(
    '.parseTag("%s", "%s") returns %s', 
    (strategy, release, expected) => {
    let {tag, error} = parseTag(strategy, release)
    expect(tag).toMatch(expected)
    expect(error).toBeUndefined()
  })
})

describe('parseInputList', ()=>{

  test.each(parseInputListScenarios)('expect %s to be an array%%', (list, expected) => {
    let result = parseInputList(list)
    expect(result).toEqual(expected)
  })

})
