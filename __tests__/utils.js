const {getInputBoolean, getInputList, conditionalTagsReducer} = require('../src/utils')
const {conditionalTagsReducerScenarios, getInputBooleanScenarios, getInputListScenarios} = require('./__data__/utils')

describe('getInputBoolean', () => {
  test.each(getInputBooleanScenarios)('%s should be %s', (scenario, expected) => {
    expect(getInputBoolean(scenario)).toBe(expected)
  })
})

describe('getInputList', ()=>{

  test.each(getInputListScenarios)('expect %s to be an array%%', (list, expected) => {
    let result = getInputList(list)
    expect(result).toEqual(expected)
  })

})

describe.skip('conditionalTagFilter', () => {
  test('reduces imperative booleans',() => {
    let inputTags = ['%X%', '%X.Y%::true', '%X.Y.Z%::false', '%X%-foobar::false', '%X.Y%-foobar::true']
    expect(inputTags.reduce(conditionalTagsReducer)).toEqual(['%X%', '%X.Y%','%X.Y%-foobar'])
  })
})
