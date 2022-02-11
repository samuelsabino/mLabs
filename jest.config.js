module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'src/test/coverage',
  coverageReporters: ['text', 'html'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config']
};
