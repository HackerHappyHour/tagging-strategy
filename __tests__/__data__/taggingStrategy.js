// [expected output, object passed to taggingStrategy function]
exports.scenarios = [
  [
    '1,1.0,1.0.0',
    {inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0'}
  ],
  [
    '1.0.0',
    {inputTags:'%X%::false,%X.Y%::false,%X.Y.Z%', tagName:'1.0.0'}
  ],
  [
    'foo/bar:1,foo/bar:1.0,foo/bar:1.0.0',
    {inputTags:'%X%,%X.Y%,%X.Y.Z%::true', tagName:'1.0.0', imageName: 'foo/bar'}
  ],
  [
    'foo/bar:1,foo/bar:1.0.0',
    {inputTags:'%X%,%X.Y%::\'false\',%X.Y.Z%::\'true\'', tagName:'1.0.0', imageName: 'foo/bar'}
  ],
  [
    'foo/bar:1,foo/bar:1.0.0',
    {inputTags:'%X%,%X.Y%::\'false\',%X.Y.Z%::true', tagName:'1.0.0', imageName: 'foo/bar'}
  ],
  [
    'foo/bar:1,foo/bar:1.0,foo/bar:1.0.0',
    {inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0', imageName: 'foo/bar' }
  ],
  [
    'foo/bar:1.0,foo/bar:1.0.0',
    {inputTags:'%X%::false,%X.Y%::true,%X.Y.Z%::\'true\'', tagName:'1.0.0', imageName: 'foo/bar'}
  ],
  [
    '1,1.0,1.0.0',
    {inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0'}
  ],
  [
    '1-foobar,1.0-foobar,1.0.0-foobar',
    {inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0'}
  ],
  [
    '1-foobar,1.0-foobar,1.0.0-foobar',{inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0'}
  ],
  [
    'hello/world:1-foobar,hello/world:1.0-foobar,hello/world:1.0.0-foobar',
    {inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0', imageName: 'hello/world'}
  ],
  [
    'hello/world:1-foobar,hello/world:1.0.0-foobar',
    {inputTags:'%X%-foobar,%X.Y%-foobar::false,%X.Y.Z%-foobar', tagName:'1.0.0', imageName: 'hello/world'}
  ],
  [
    '1-rc1,1.0-rc1,1.0.0-rc1',
    {inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0rc1'}
  ],
  [
    '1-rc1-foobar,1.0-rc1-foobar,1.0.0-rc1-foobar',
    {inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0rc1'}
  ],
  [
    'hello/world:1-rc1-foobar,hello/world:1.0-rc1-foobar,hello/world:1.0.0-rc1-foobar',
    {inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0rc1', imageName: 'hello/world'}
  ],
  [
    'hello/world:1-rc1-foobar,hello/world:1.0-rc1-foobar,hello/world:1.0.0-rc1-foobar',
    {inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0rc1', imageName: 'hello/world'}
  ],
  [
    'hello/world:1-rc1-foobar,hello/world:1.0-rc1-foobar,hello/world:1.0.0-rc1-foobar',
    {inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0rc1', imageName: 'hello/world'}
  ],
]
