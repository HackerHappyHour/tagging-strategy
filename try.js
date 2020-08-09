const {parseTag} = require('./src/parser')

const stringShouldMatch = [
  '%X.Y%-foobar',
  '%X%-foobar',
  '%X.Y.Z%-foobar',
  '%X.y.Z%-something',
]

const stringShouldNotMatch = [
  '%X.1.Z%',
  'foo-%X.Y.Z%-bar', 
  '%X.X%-something'
]

stringShouldMatch.forEach(pattern => {
  const tag = parseTag(pattern, '1.0.0-something.2')
  if (tag.error) console.error(tag.error)
  console.log('\ntag:', tag)
})

