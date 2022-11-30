module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'default-param-last': 'off',
    'no-unused-expressions': 'off',
    'linebreak-style': 'off',
  },
};
