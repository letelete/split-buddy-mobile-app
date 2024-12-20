module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'universe/native',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js', '.prettierrc', 'babel.config.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'no-void': 'off',
    'react/jsx-sort-props': [
      1,
      {
        callbacksLast: true,
        shorthandLast: true,
        multiline: 'first',
        noSortAlphabetically: false,
        reservedFirst: true,
        ignoreCase: true,
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
          },
        ],
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
