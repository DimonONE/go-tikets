module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types'],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@Server': './server',
            '@Components': './components',
            '@Screens': './screens',
            '@Hooks': './hooks',
            '@Helpers': './helpers',
            '@Containers': './containers',
            '@Assets': './assets',
            '@Navigation': './navigation',
            '@Plugins': './plugins',
          },
          extensions: ['.js', '.jsx'],
        },
      ],
    ],
  };
};
