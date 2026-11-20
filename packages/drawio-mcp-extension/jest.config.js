/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "jest-environment-node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  testMatch: ["**/utils/*.test.ts"],
  coverageProvider: "v8",
  collectCoverageFrom: ["utils/**/*.ts", "!utils/**/*.test.ts"],
  coverageReporters: ["text-summary", "lcov", "json"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  modulePaths: ["../../node_modules", "./node_modules"],
};