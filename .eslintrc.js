module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      // jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    // cant handle export * as
    'import/named': 'off',
    'no-multi-assign': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'consistent-return': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['dev/**'] },
    ],
  },
  plugins: ['flowtype', 'promise', 'prettier', 'react', 'jsx-a11y'],
};
