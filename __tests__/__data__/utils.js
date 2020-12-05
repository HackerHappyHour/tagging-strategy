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
exports.conditionalTagsReducerScenarios = [
  [['%X%', '%X.Y%::true', '%X.Y.Z%::false'],['%X%', '%X.Y%']],
]
