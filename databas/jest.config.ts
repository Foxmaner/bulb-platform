import { defaults as tsjPreset } from 'ts-jest/presets';


module.exports = {
    preset: 'ts-jest',
    rootDir: "./",
    transform: tsjPreset.transform,
    testMatch: [
        "**/test/tests/**/?(*.)+(spec).ts"
    ],
    collectCoverageFrom: [
        "./**/*.controller.ts"
    ],

    collectCoverage: true,
    coverageDirectory: "./coverage",

    clearMocks: true,
    watchPathIgnorePatterns: ['globalConfig'],
    setupFiles: ['./src/test/setEnv.ts'],
};