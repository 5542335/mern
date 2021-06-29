module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'sort-keys-fix'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/explicit-module-boundary-types': 2,
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/no-explicit-any': [2],
    '@typescript-eslint/semi': [2],
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-use-before-define': 2,
    'no-use-before-define': 0,
    'no-multiple-empty-lines': [2, { 'max': 1 }],
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: ['if', 'return'] },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: ['const', 'let'], next: '*'},
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let']}
    ],
    'max-len': [2,
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'sort-keys-fix/sort-keys-fix': 2,
    'import/order': [2, {
      groups: [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling'],
        'index',
      ],
      'newlines-between': 'always',
    }],
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.e2e-spec.ts', '*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
