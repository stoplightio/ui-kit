const React = require('react');
const { merge } = require('lodash');

const { Flex } = require('../src/components/Flex');
const { baseTheme } = require('../src/theme');
const { ThemeProvider } = require('../src/utils');

const themes = require('./themes');

class ThemeStateContainer extends React.Component<any, { themeName: string }> {
  constructor(props) {
    super(props);
    this.state = {
      themeName: sessionStorage.currentThemeName || 'none',
    };
  }

  public render() {
    const { themeName } = this.state;

    const theme = merge({}, baseTheme, themes[themeName] || {});

    console.info('Current Theme:', themeName, themes.base, theme);

    return (
      <ThemeProvider theme={theme}>
        <Flex
          fg="fg"
          bg="bg"
          items="center"
          justify="center"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          style={{
            fontFamily:
              'system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
          }}
        >
          <select
            value={this.state.themeName}
            onChange={this._onChange}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {Object.keys(themes).map(x => (
              <option key={x} value={x}>
                Theme: {x}
              </option>
            ))}
          </select>

          {this.props.children}
        </Flex>
      </ThemeProvider>
    );
  }

  private _onChange = e => {
    this.setState({ themeName: e.target.value });
    sessionStorage.currentThemeName = e.target.value;
  };
}

// @ts-ignore
module.exports = storyFn => <ThemeStateContainer>{storyFn()}</ThemeStateContainer>;
