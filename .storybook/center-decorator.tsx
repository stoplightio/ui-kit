const React = require('react');

const { baseTheme } = require('../src/theme');
const { ThemeProvider } = require('../src/utils');

class ThemeStateContainer extends React.Component<any, { themeName: string }> {
  constructor(props) {
    super(props);
  }

  public render() {
    console.info('Current Theme: base', baseTheme);

    return (
      <ThemeProvider theme={baseTheme}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {this.props.children}
        </div>
      </ThemeProvider>
    );
  }
}

module.exports = storyFn => <ThemeStateContainer>{storyFn()}</ThemeStateContainer>;
