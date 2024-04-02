const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    preset: 'ts-jest',
    transform: tsjPreset.transform,
    coverageDirectory: "./coverage",
    testMatch: [
        "**/test/tests/**/?(*.)+(spec).ts"
    ],
    collectCoverageFrom: [
        "./src/test/tests/**/*.ts"
    ],
    modulePathIgnorePatterns: [
        "src/@types/",
        "src/config/",
        "src/database/",
        "src/models/"
    ],

    collectCoverage: true,
    clearMocks: true,
    watchPathIgnorePatterns: ['globalConfig'],

    setupFilesAfterEnv: ['./src/test/jest.setup.ts'],
    globalSetup: './src/test/jest.setup.ts',
    globalTeardown: './src/test/jest.teardown.ts',
};