module.exports = {
  preset: '@stoplight/scripts',
  setupTestFrameworkScriptFile: './setupTests.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom'
};
