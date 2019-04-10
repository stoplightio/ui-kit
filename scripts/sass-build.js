const path = require('path');
const fs = require('fs');

const { JsonToScss, ScssToCss } = require('../src/_utils/transformers');

// LOAD THE CONFIG OBJECT
const cwd = process.cwd();
const config = require(path.resolve(cwd, './src/styles/config.js'));

let content = `/*
 * THESE VARIABLES ARE AUTOMATICALLY GENERATED USING THE SASS-BUILD SCRIPT AND SHOULD NOT BE UPDATED BY HAND
 * TO UPDATE ONE OF THESE VALUES, UPDATE THE STYLES/CONFIG.JS AND RUN "YARN BUILD"
 */\n
`;

try {
  content += JsonToScss(config);
} catch (err) {
  throw err;
}

// CREATE DEFAULTS FILE
fs.writeFile(path.resolve(cwd, './src/styles/common/_defaults.scss'), content, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('./src/styles/common/_defaults.scss updated!');

  // CREATE COMPILED CSS FILE
  fs.readFile(path.resolve(cwd, './src/styles/index.scss'), function(err, data) {
    if (err) {
      throw err;
    }

    content = data.toString('utf-8');

    // convert data write to file
    ScssToCss({
      scss: content,
      importers: ['package'],
      postCSS: ['postcss-import', 'tailwind', 'autoprefixer'],
      includePaths: [path.resolve(cwd, './src/styles')],
      // config,
    }).then(res => {
      console.log({ res });
    });
  });
});
