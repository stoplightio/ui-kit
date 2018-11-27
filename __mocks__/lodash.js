const _ = require.requireActual('lodash');

module.exports = _;
module.exports.debounce = jest.fn(_.debounce);
