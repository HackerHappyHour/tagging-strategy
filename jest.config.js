const {defaults} = require('jest-config')

module.exports = {
  modulePathIgnorePatterns: [...defaults.modulePathIgnorePatterns, '<rootDir>/__tests__/__data__/']
}
