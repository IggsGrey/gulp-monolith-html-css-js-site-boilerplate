module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
	},
	extends: [
		// 'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		// "prettier/@typescript-eslint",
		'plugin:prettier/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	rules: {
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
