/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "jest-environment-node",
  rootDir: ".",
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov", "json"],
  transform: {
    "^.+\\.js$": "<rootDir>/scripts/jest-sourcemap-transform.cjs",
    "^.+\\.[jt]sx?$": ["ts-jest", { useESM: true }],
  },
  transformIgnorePatterns: ["/node_modules/(?!nanoid|\\.pnpm)"],
  testMatch: ["**/build/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/src/", "/build/real-environment/"],
  collectCoverageFrom: [
    "packages/drawio-mcp-server/build/**/*.js",
    // exclude as it contains boundary injection logic mainly
    "!packages/drawio-mcp-server/build/index.js",
    "!**/node_modules/**",
    "!packages/drawio-mcp-server/build/**/*.test.js",
    "!packages/drawio-mcp-server/build/plugin/**",
    "!packages/drawio-mcp-server/build/assets/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
