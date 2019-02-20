const path = require('path');
const defaultConfig = require('@stoplight/scripts/.storybook/webpack.config');

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [path.resolve(process.cwd(), '.storybook')],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          onlyCompileBundledFiles: true,
        }
      },
    ],
  });

  // ... further customize if needed

  return config;
};
