module.exports = {
  roots: [""],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  modulePathIgnorePatterns: ["fixtures", "testSetupFile", "server", "coverage"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testURL: "http://localhost/",
  testEnvironment: "node",
  rootDir: ".",
  setupFilesAfterEnv: ["./tests/testSetupFile.js"],
  coverageReporters: ["json-summary", "text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
