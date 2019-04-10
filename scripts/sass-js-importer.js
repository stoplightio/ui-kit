/**
 * inspired from https://github.com/Loilo/node-sass-js-importer
 * added some safe gaurds to the orginal to strip out non-valid scss
 * TODO -tests
 */

var fs = require('fs');
var path = require('path');

const JsImporter = (url, prev) => {
  // if we arent importing a javascript file, return
  if (!/\.js$/.test(url)) {
    return null;
  }

  let paths = [].concat(prev.slice(0, prev.lastIndexOf('/')));

  let file = paths
    .map(p => path.resolve(p, url))
    .filter(fs.existsSync)
    .pop();

  if (!file) {
    return new Error(`Unable to find "${url}" from the following path(s): ${paths.join(', ')}. Check includePaths.`);
  }

  // Prevent file from being cached by Node's `require` on continuous builds.
  // https://github.com/Updater/node-sass-json-importer/issues/21
  delete require.cache[require.resolve(file)];

  try {
    return {
      contents: JsonToSass(require(file)),
    };
  } catch (e) {
    return new Error(
      `ui-kit-sass-js-importer: Error transforming JavaScript to SASS. Check if you exported a valid JavaScript object. ${e}`
    );
  }
};

module.exports = JsImporter;
