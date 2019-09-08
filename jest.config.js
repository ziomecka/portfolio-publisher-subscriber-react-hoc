module.exports = {
  moduleFileExtensions: [ 'js', 'jsx', 'ts', 'tsx' ],
  testEnvironment: 'jsdom',
  testMatch: [
    './**/*.(test|spec).js',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'dist'
  ],
  testURL: 'https://someFakeUrl.com',
  verbose: true,
  setupFilesAfterEnv: [
    './enzyme.config.js',
    './node_modules/jest-enzyme/lib/index.js',
  ],
  // "testEnvironment": "enzyme",
  // "testEnvironmentOptions": {
  //   "enzymeAdapter": "react16"
  // }
};
