const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'web',

  entry: {
    'code-worker': './src/CodeViewer/worker/index.ts',
  },

  output: {
    path: path.join(__dirname, 'dist/workers'),
    libraryTarget: 'commonjs-module',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,
          module: true,
          safari10: true,
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
    ],
  },
};
