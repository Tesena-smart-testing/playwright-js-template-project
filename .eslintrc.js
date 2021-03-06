module.exports = {
  parser: "babel-eslint",
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
    mocha: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
};
