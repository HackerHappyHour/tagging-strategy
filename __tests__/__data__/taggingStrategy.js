// [expected output, object passed to taggingStrategy function]
exports.scenarios = [
  ['1,1.0,1.0.0',{inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0'}],
  ['foo/bar:1,foo/bar:1.0,foo/bar:1.0.0',{inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0', imageName: 'foo/bar'}],
  ['foo/bar:1,foo/bar:1.0,foo/bar:1.0.0,foo/bar:latest',{inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0', imageName: 'foo/bar', latest: true}],
  ['1,1.0,1.0.0,latest',{inputTags:'%X%,%X.Y%,%X.Y.Z%', tagName:'1.0.0', latest: true}],
  ['1-foobar,1.0-foobar,1.0.0-foobar',{inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0'}],
  ['1-foobar,1.0-foobar,1.0.0-foobar,latest',{inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0', latest: true}],
  ['hello/world:1-foobar,hello/world:1.0-foobar,hello/world:1.0.0-foobar,hello/world:latest',{inputTags:'%X%-foobar,%X.Y%-foobar,%X.Y.Z%-foobar', tagName:'1.0.0', latest: true, imageName: 'hello/world'}],
]
