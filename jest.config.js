module.exports = {
  preset: '@stoplight/scripts',
  setupTestFrameworkScriptFile: './setupTests.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"]
};
