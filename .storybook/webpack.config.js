const defaultConfig = require('@stoplight/storybook-config/webpack.config');

module.exports = setup => {
  const config = defaultConfig(setup);

  config.module.rules[2] = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  };

  return config;
};
