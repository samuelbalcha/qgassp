module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['./jest.setup.ts'],
	collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
	coverageThreshold: {
		'src/**/*.ts': {
			statements: 30,
			branches: 30,
			functions: 30,
			lines: 30,
		},
	},
	modulePathIgnorePatterns: ['dist/'],
};
