const {parseTag} = require('./parser')
const {invalidTag} = require('./errors')

const strategies = [
  ['%X.Y.Z%-camera', '1.0.0-rc1', '1.0.0-rc1-camera'],
  ['%X.Y.Z%-camera', '1.0.0-rc.1', '1.0.0-rc.1-camera']
]

test('it accepts "latest"', () => {
  const tag = parseTag('latest', '1.0.0')
  expect(tag).toMatchObject({tag:'latest'})
})

test.each(strategies)(
  '.parseTag("%s", "%s") returns %s', 
  (strategy, release, expected) => {
  let {tag} = parseTag(strategy, release)
  expect(tag).toMatch(expected)
})

test.skip('it returns an error if any un-parseable alpha chars exist', () => {
  let strategy = '%X.1.Z%-foobar'
  let release = '1.0.0'
  let {tag, error} = parseTag(strategy, release)
  expect(error).toMatchObject(invalidTag)
})

