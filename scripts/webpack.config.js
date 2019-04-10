const path = require('path');
const { JsImporter } = require('./sass-js-importer');
const PackageImporter = require('node-sass-package-importer');

const cwd = process.cwd();

module.exports = ({ config }) => {
  config.context = cwd;
  config.mode = 'development';
  config.resolve.alias['@project/stories'] = require.resolve('src/__stories__/index.ts', { paths: [cwd] });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          onlyCompileBundledFiles: true, // https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles-boolean-defaultfalse
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          ident: 'postcss',
          plugins: loader => [
            require('postcss-import'),
            // replace with proper config per app
            tailwindcss('./src/styles/tailwind/tailwind.config.js'),
            require('autoprefixer'),
          ],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          importer: [JsImporter, PackageImporter()],
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  });

  return config;
};
