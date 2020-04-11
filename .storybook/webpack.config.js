const path = require('path');
const defaultConfig = require('@stoplight/storybook-config/webpack.config');
const inliner = require('sass-inline-svg');
const { last } = require('lodash');

const cwd = process.cwd();

module.exports = (baseConfig, env, config) => {
  config = defaultConfig(baseConfig, env, config);

  config.watchOptions = { ignored: ['dist', /node_modules\/(?!@stoplight)/] };

  // we need to override the 'svg-icon' configuration unfortunately
  last(last(config.module.rules).use).options.sassOptions.functions['svg-icon'] = inliner(
    path.resolve(cwd, 'src', 'styles', 'icons'),
    {
      optimize: true,
      encodingFormat: 'uri',
    },
  );

  return config;
};
