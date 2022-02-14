module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'test/coverage',
  coverageReporters: ['text', 'html'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testMatch: ['**/test/**/*.spec.ts', '**/test/**/*.test.ts'],
  setupFilesAfterEnv: ['./src/infra/helpers/connection/transaction.ts']
};
