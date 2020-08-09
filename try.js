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
  const {strategy, prerelease, major, minor, patch, error} = parseTag(pattern, '1.0.0-something.2')
  if (error) console.error(error)
  console.log(`strategy: ${strategy}`)
  console.log(`prerelease: ${variant}`)
  console.log(`major: ${major}`)
  console.log(`minor: ${minor}`)
  console.log(`patch: ${patch}\n\n`)
})

