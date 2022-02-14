const config = require('./jest.config');

config.testMatch = ['**/test/**/*.spec.ts'];
config.setupFilesAfterEnv = [''];

module.exports = config;
