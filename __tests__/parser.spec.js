const {parseTag, parseInputList} = require('../src/parser')
const {invalidTag} = require('../src/errors')


describe('parseTag',()=>{
  let scenarios = [
    ['%X.Y.Z%-foobar', '1.0.0-rc1', '1.0.0-rc1-foobar'],
    ['%X.Y.Z%-foobar', '1.0.0-rc.1', '1.0.0-rc.1-foobar'],
    ['%X.Y%-foobar', '1.0.0-rc1', '1.0-rc1-foobar'],
    ['%X.Y%-foobar', '1.0.0-rc.1', '1.0-rc.1-foobar'],
    ['%X%-foobar', '1.0.0-rc1', '1-rc1-foobar'],
    ['%X%-foobar', '1.0.0-rc.1', '1-rc.1-foobar'],
    ['%X%-foobar', '1.0.0', '1-foobar'],
  ]
  test.each(scenarios)(
    '.parseTag("%s", "%s") returns %s', 
    (strategy, release, expected) => {
    let {tag, error} = parseTag(strategy, release)
    expect(tag).toMatch(expected)
    expect(error).toBeUndefined()
  })
})

describe('parseInputList', ()=>{
  let scenarios = [
    ['%X%', ['%X%']],
    ['%X%,%X.Y%', ['%X%', '%X.Y%']]
  ]

  test.each(scenarios)('expect %s to be an array%%', (list, expected) => {
    let result = parseInputList(list)
    expect(result).toEqual(expected)
  })

})