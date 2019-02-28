module.exports = {
  preset: '@stoplight/scripts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '.(css|less)$': '<rootDir>/__mocks__/styles.js',
  },
};
