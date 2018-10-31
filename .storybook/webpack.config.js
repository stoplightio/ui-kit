const path = require('path');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = (baseConfig, env, defaultConfig) => {
  const dev = env === 'DEVELOPMENT';

  const srcDir = path.resolve(process.cwd(), 'src');
  const decoratorPath = path.resolve(process.cwd(), '.storybook');

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
