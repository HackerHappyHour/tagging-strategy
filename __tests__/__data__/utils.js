// [given, expected]
exports.getInputBooleanScenarios = [
  ['true', true],
  ['TRUE', true],
  ['TRUe', true],
  ['false', false],
  ['FALSE', false],
  ['fALse', false]
]

// [given, [expected]]
exports.getInputListScenarios = [
  ['%X%', ['%X%']],
  ['%X%,%X.Y%', ['%X%', '%X.Y%']]
]

// [given, expected]
exports.conditionalTagFilterScenarios = [
  ['%X%::false', false],
  ['%X%::true', '%X%'],
  ['%X%::\'true\'', '%X%'],
  ['%X.Y.Z%::\'true\'', '%X.Y.Z%'],

]
