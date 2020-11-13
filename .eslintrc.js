module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  plugins: ['react-hooks'],
  rules: {
    // ...
    'import/no-unresolved': 0,
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    'func-names': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-useless-escape': 0,
  },
};
