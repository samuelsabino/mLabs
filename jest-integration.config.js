const config = require('./jest.config');

config.testMatch = ['**/test/**/*.test.ts'];
config.setupFilesAfterEnv = ['./src/infra/helpers/connection/transaction.ts'];

module.exports = config;
