const {taggingStrategy} = require('../src/taggingStrategy')
const {scenarios} = require('./__data__/taggingStrategy')

describe.each(scenarios)('produce tags %s given %o', (expected, given) => {
  test('it produces a csv list', () => {
    expect(taggingStrategy(given)).toEqual(expected)
  })
})

describe('taggingStrategy() error handling', () =>{
  test('throws when given a conditional tag without a boolean', () => {
    let given = {tagName: '1.0.0', inputTags: '%X%-foobar::'}
    expect(() => taggingStrategy(given)).toThrow('A conditional tag was detected without a resolved boolean value')
  })
})
