const {extraTagsReducer, getInputBoolean, getInputList, conditionalTagsReducer} = require('../src/utils')
const {getInputBooleanScenarios, getInputListScenarios} = require('./__data__/utils')

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

describe('extraTagsReducer', () => {
  test('reduces imperative booleans',() => {

    let extraTagsOutput = ['latest::true', 'edge::true', 'canary::false'].reduce(extraTagsReducer, [])
    expect(extraTagsOutput).toEqual(['latest', 'edge'])
  })

})
