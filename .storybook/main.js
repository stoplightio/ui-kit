const path = require('path');
const inliner = require('sass-inline-svg');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
  ],
  "webpackFinal": async (config, { configType }) => {
    config.watchOptions = { ignored: ['dist', /node_modules\/(?!@stoplight)/] };

    // we need to override the 'svg-icon' configuration unfortunately
    const scss = config.module.rules.find(rule => rule.test.test('.scss'));
    const sassLoader = scss.use.find(use => use.loader === 'sass-loader');
    sassLoader.options = {
      sassOptions: {
        functions: {
          'svg-icon': inliner(
            path.resolve(process.cwd(), 'src', 'styles', 'icons'),
            {
              optimize: true,
              encodingFormat: 'uri',
            },
          ),
        }
      }
    }

    return config;
  }
}
