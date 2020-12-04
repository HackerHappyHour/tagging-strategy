const {getInputBoolean, getInputList, conditionalTagFilter} = require('../src/utils')
const {conditionalTagFilterScenarios, getInputBooleanScenarios, getInputListScenarios} = require('./__data__/utils')

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

describe('conditionalTagFilter', () => {
  test.each(conditionalTagFilterScenarios)('expect %s to be %s', (given, expected) => {
    expect(conditionalTagFilter(given)).toEqual(expected)
  })

})
