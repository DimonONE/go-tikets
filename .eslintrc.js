module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/function-component-definition': [
      true,
      {
        namedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx'],
        map: [
          ['@', './'],
          ['@Components', './components'],
          ['@Assets', './assets'],
          ['@Containers', './containers'],
          ['@Helpers', './helpers'],
          ['@Hooks', './hooks'],
          ['@Navigation', './navigation'],
          ['@Plugins', './plugins'],
          ['@Screens', './screens'],
          ['@Server', './server'],
        ],
      },
    },
  },
};
