const {
  errors,
  parseTag, 
  replacers 
} = require('./parser')

describe('if no delimiters found', ()=>{
  test('it accepts "latest"', () => {
    const tag = parseTag('latest', '1.0.0')
    expect(tag).toMatchObject({tag:'latest'})
  })

  test.skip('it returns an error if any un-parseable alpha chars exist', () => {
    let strategy = '%X.1.Z%-foobar'
    let release = '1.0.0'
    const {invalidTag} = errors
    let {tag, error} = parseTag(strategy, release)
    console.log('invalidTag: ', invalidTag)
    console.log('error', error)
    console.log('tag', tag)
    expect(error).toMatchObject(invalidTag)
  })
})

describe('if delimiters found', () => {
  const strategies = [
    ['%X.Y%-camera', '1.0-rc1', '1.0-rc1-camera'],
    ['%X.Y.Z%-camera', '1.0-rc1', '1.0.0-rc1-camera']
  ]
  test.each(strategies)('.parseTag', (strategy, release, expected) => {
    let {tag} = parseTag(strategy, release)
    expect(tag).toMatch(expected)
  })
})
