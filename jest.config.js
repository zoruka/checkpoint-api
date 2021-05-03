module.exports = {
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	roots: ['<rootDir>/tests'],
	preset: '@shelf/jest-mongodb',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
};
