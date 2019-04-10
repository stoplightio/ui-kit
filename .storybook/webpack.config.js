const defaultConfig = require('../scripts/webpack.config.js');

module.exports = ({ config }) => {
  defaultConfig(config);
  return config;
};
