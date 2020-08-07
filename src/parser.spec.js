const {parseTag} = require('./parser')

describe('if no delimiters found', ()=>{
  test('it accepts "latest"', () => {
    const tag = parseTag('latest')
    expect(tag).toMatch('latest')
  })

  test.skip('it accepts X.Y.Z', () => {

  })

})
