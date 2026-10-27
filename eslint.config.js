import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import i18next from 'eslint-plugin-i18next'
import preferArrow from 'eslint-plugin-prefer-arrow'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
	{ ignores: ['dist', 'tmp', 'coverage', 'eslint.config.js'] },
	js.configs.recommended,
	...tsPlugin.configs['flat/recommended'],
	reactHooks.configs.flat.recommended,
	react.configs.flat.recommended,
	react.configs.flat['jsx-runtime'],
	prettierRecommended,
	...pluginQuery.configs['flat/recommended'],
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			'react-refresh': reactRefresh,
			'prefer-arrow': preferArrow,
			i18next: i18next
		},
		rules: {
			'react-hooks/exhaustive-deps': 'off',
			'prettier/prettier': 'warn',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true }
			],

			'no-restricted-syntax': [
				'error',
				{
					selector:
						'ImportDeclaration[source.value=/.svg/][source.value=/\\u002E\\u002E\\u002Fassets/]',
					message:
						'Use the global alias "@assets" instead of a relative path to the icon'
				},
				{
					selector:
						'ImportDeclaration[source.value=/\\u002Esvg/] ImportDefaultSpecifier[local.name!=/Icon/]',
					message:
						'Not allowed to import SVG icons as components without the "Icon" suffix at the end.'
				},
				{
					selector:
						'ImportDeclaration[source.value=/@\\u002F(api|assets|components|constants|pages|providers|store|temp|types|utils)/]',
					message: 'Use alias `@{folderName}/` instead of `@/{folderName}/`'
				}
			],

			/* Arrow functions */
			'prefer-arrow/prefer-arrow-functions': [
				'error',
				{
					disallowPrototype: true,
					singleReturnOnly: false,
					classPropertiesAllowed: false
				}
			],
			'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
			'func-style': ['error', 'expression', { allowArrowFunctions: true }],

			/* Other rules */
			'array-callback-return': 'error',
			'no-await-in-loop': 'error',
			'no-constant-binary-expression': 'error',
			'no-duplicate-imports': 'error',
			'no-template-curly-in-string': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',
			'no-use-before-define': 'error',
			camelcase: 'error',
			'id-length': [
				'error',
				{ exceptions: ['_', 'w', 'h', 'e', 'i', 'j', 'k', 'p', 'm', 't'] }
			],
			eqeqeq: ['error', 'smart'],
			'dot-notation': 'error',
			curly: 'error',
			'no-lonely-if': 'error',
			'no-return-assign': 'error',
			'no-multi-str': 'error',
			'no-implicit-coercion': 'error',

			/* i18next */
			'i18next/no-literal-string': [
				'error',
				{
					message: 'Disallow literal string. Use i18next instead!'
				}
			]
		}
	},
	{
		settings: {
			react: {
				version: 'detect'
			}
		}
	}
]
