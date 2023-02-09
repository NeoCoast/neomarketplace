module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    webextensions: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.js', '.jsx'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'new-cap': 0,
    'react/button-has-type': 0,
    'jsx-a11y/control-has-associated-label': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/require-default-props': 0,
    'no-plusplus': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-empty-function': 0,
    'no-continue': 0,
    'react/jsx-no-comment-textnodes': 0,
    'react/jsx-one-expression-per-line': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
      typescript: {},
    },
  },
};
