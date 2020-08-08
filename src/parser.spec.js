const {
  errorInvalidTag, 
  parseTag, 
  replacers 
} = require('./parser')

describe('if no delimiters found', ()=>{
  test('it accepts "latest"', () => {
    const tag = parseTag('latest')
    expect(tag).toMatch('latest')
  })

  test.skip('it returns an error if any unparseable alpha chars exist', () => {

  })
})

describe('if delimiters found', () => {
  const testPatterns = [
    '%X.Y%-foobar',
    'foo-%X.Y.Z%-bar',
    '%X.1.Z%'
  ]
  test('%X.Y%-foobar', () => {
    const pattern = '%X.Y%-foobar'
    const output = {
      strategy_tag: 'latest'
    }
    expect(parseTag(pattern, '1.0.0')).toMatchObject(output)
    expect(parseTag(pattern, 'v1.0.0-foobarbaz1')).toMatchObject(output)

    // non-strict tags will be coerced to strict tags
    expect(parseTag(pattern, 'x1.0.0')).toMatchObject(output)
    expect(parseTag(pattern, 'x1.0.0xyz')).toMatchObject(output)
    expect(parseTag(pattern, '1')).toMatchObject(output)
    expect(parseTag(pattern, 'v1')).toMatchObject(output)
  })

  test.skip('foo-%X.Y.Z%-bar', () => {})

})


