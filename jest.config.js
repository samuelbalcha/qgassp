module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['./jest.setup.ts'],
	collectCoverageFrom: ['server/**/*.ts', '!**/node_modules/**'],
	coverageThreshold: {
		'server/**/*.ts': {
			statements: 30,
			branches: 30,
			functions: 30,
			lines: 30,
		},
	},
	modulePathIgnorePatterns: ['server/config/', 'src/', 'dist/'],
};
