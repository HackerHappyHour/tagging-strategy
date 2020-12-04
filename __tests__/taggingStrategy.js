const {taggingStrategy} = require('../src/taggingStrategy')
const {scenarios} = require('./__data__/taggingStrategy')

describe.each(scenarios)('produce tags %s given %o', (expected, given) => {
  test('it produces a csv list', () => {
    expect(taggingStrategy(given)).toEqual(expected)
  })
})
