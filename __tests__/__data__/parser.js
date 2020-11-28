exports.parseTagScenarios = [
  ['%X.Y.Z%-foobar', '1.0.0-rc1', '1.0.0-rc1-foobar'],
  ['%X.Y.Z%-foobar', '1.0.0-rc.1', '1.0.0-rc.1-foobar'],
  ['%X.Y%-foobar', '1.0.0-rc1', '1.0-rc1-foobar'],
  ['%X.Y%-foobar', '1.0.0-rc.1', '1.0-rc.1-foobar'],
  ['%X%-foobar', '1.0.0-rc1', '1-rc1-foobar'],
  ['%X%-foobar', '1.0.0-rc.1', '1-rc.1-foobar'],
  ['%X%-foobar', '1.0.0', '1-foobar']
]

exports.parseInputListScenarios = [
  ['%X%', ['%X%']],
  ['%X%,%X.Y%', ['%X%', '%X.Y%']]
]
