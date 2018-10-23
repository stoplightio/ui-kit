const path = require('path');
const postcssConfig = require('../postcss.config.js');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = (baseConfig, env, defaultConfig) => {
  const dev = env === 'DEVELOPMENT';

  const srcDir = path.resolve(process.cwd(), 'src');
  const decoratorPath = path.resolve(process.cwd(), '.storybook');

  // Override the postcss plugins to use ours
  defaultConfig.module.rules[2].use[2].options.plugins = postcssConfig.plugins;

  // Add typescript loader
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [srcDir, decoratorPath],
    loader: require.resolve('ts-loader'),
    options: {
      transpileOnly: true,
      experimentalWatchApi: true,
      onlyCompileBundledFiles: true,
      experimentalFileCaching: true,
      getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
    },
  });
  defaultConfig.resolve.extensions.push('.ts', '.tsx');

  defaultConfig.output.globalObject = 'this';
  return defaultConfig;
};
