const get = require('lodash/get');
const tailwind = require('./tailwind/tailwind.config');
const CodeEditor = require('../components/Code/styles/_variables');

// cleaned export of what vars we want exposed as scss variables
module.exports = {
  'sl-config': {
    borderRadius: get(tailwind, 'theme.borderRadius', {}),
    colors: get(tailwind, 'theme.colors', {}),
    fontSize: get(tailwind, 'theme.fontSize', {}),
    fontFamily: get(tailwind, 'theme.fontFamily', {}),
  },

  ...CodeEditor,
};
