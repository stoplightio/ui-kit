const ReactVirtualized = require.requireActual('react-virtualized')

const AutoSizer = jest.fn(ReactVirtualized.AutoSizer);
AutoSizer.displayName = 'AutoSizer'

module.exports = {
  ...ReactVirtualized,
  AutoSizer,
};

