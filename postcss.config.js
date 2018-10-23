const path = require('path');
const { compact } = require('lodash');
const cssNext = require('postcss-cssnext');
const cssNano = require('cssnano');
const cssImport = require('postcss-easy-import');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: compact([
    cssImport(),
    cssNext({
      warnForDuplicates: false,
    }),
    !isDev && cssNano(),
  ]),
};
