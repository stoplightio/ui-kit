const path = require('path');
const sass = require('sass');

const cwd = process.cwd();

module.exports = ({ config }) => {

  config.context = cwd;
  config.watchOptions = { ignored: ['dist', /node_modules\/(?!@stoplight)/] };

  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias['@project/stories'] = path.resolve(cwd, 'src', '__stories__', 'index.ts');
  config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];

  config.module.rules.push({
    test: /\.tsx?$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          onlyCompileBundledFiles: true,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      { loader: require.resolve('style-loader') },
      {
        loader: require.resolve('css-loader'),
        options: { importLoaders: 2 },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          plugins: [
            require('postcss-import'),
            require('autoprefixer')({
              env: 'last 2 Chrome versions, last 2 Firefox versions, last 1 Safari version',
            }),
          ],
        },
      },
      'resolve-url-loader',
      {
        loader: require.resolve('sass-loader'),
        options: {
          implementation: sass,
          sassOptions: {
            functions: {
              // Keep Storybook styles compiling even when icon inliner isn't available.
              'svg-icon($icon, $opts: null)': () => new sass.types.String('""'),
            },
          },
        },
      },
    ],
  });

  return config;
};
