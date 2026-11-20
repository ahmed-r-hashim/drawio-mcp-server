export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  testMatch: ["**/*.test.ts"],
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.test.ts"],
  coverageReporters: ["text-summary", "lcov", "json"],
};
