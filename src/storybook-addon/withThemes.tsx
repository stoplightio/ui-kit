import * as React from 'react';

// @ts-ignore
import addons, { makeDecorator } from '@storybook/addons';

import { Flex } from '../Flex';
import { ThemeProvider, useTheme } from '../theme';

export const withThemes = (themes: any[]) =>
  makeDecorator({
    name: 'withThemes',
    wrapper: (story: any, context: any) => {
      // @ts-ignore
      return (
        <ThemeContainer channel={addons.getChannel()} themes={themes}>
          {story(context)}
        </ThemeContainer>
      );
    },
  });

const App: React.SFC = ({ children }) => {
  const theme = useTheme();

  return (
    <Flex
      color={theme.canvas.fg}
      backgroundColor={theme.canvas.bg}
      alignItems="center"
      justifyContent="center"
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .PreviewContainer td:nth-child(2) {
              max-width: 460px;
              overflow: auto;
            }
          `,
        }}
      />

      <Flex style={{ overflow: 'auto' }} m="auto" p="75px 0" className="PreviewContainer">
        {children}
      </Flex>
    </Flex>
  );
};

class ThemeContainer extends React.Component<any, any> {
  public state = {
    themeName: sessionStorage.themeName || 'light',
  };

  public componentDidMount() {
    const { channel } = this.props;
    channel.on('themes/setTheme', this.onThemeChange);
  }

  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('themes/setTheme', this.onThemeChange);
  }

  public onThemeChange = (themeName: string) => {
    this.setState({ themeName });
  };

  public render() {
    const { themeName } = this.state;

    return (
      <ThemeProvider theme={{ base: themeName }}>
        <App {...this.props} />
      </ThemeProvider>
    );
  }
}
