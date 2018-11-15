const styledComponents = require.requireActual('styled-components');

const ThemeConsumer = jest.fn(styledComponents.ThemeConsumer);
ThemeConsumer.displayName = 'ThemeConsumer';

module.exports = styledComponents;
module.exports.ThemeConsumer = ThemeConsumer;
