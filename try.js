const {parseTag} = require('./src/parser')

const strategies = [
  '%X.Y.Z%-foobar',
  '%X%-foobar',
  '%X.Y.Z%-foobar',
  '%X.y.Z%-foobar',
]

strategies.forEach(pattern => {
  const tag = parseTag(pattern, '1.0.0-rc2')
  if (tag.error) console.error(tag.error.message)
  console.log('\ntag:', tag)
})

