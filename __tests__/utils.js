const {getInputBoolean} = require('../src/utils')
const {getInputBooleanScenarios} = require('./__data__/utils')

describe('getInputBoolean', () => {
  test.each(getInputBooleanScenarios)('%s should be %s', (scenario, expected) => {
    expect(getInputBoolean(scenario)).toBe(expected)
  })
})
