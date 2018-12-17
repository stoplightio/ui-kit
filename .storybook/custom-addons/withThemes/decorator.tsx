/* @jsx jsx */

import { jsx } from '@emotion/core';
/// @ts-ignore
import addons, { makeDecorator } from '@storybook/addons';
import { Component, FunctionComponent, ReactNode } from 'react';

import { createThemedModule, Flex, ICustomTheme, ThemeProvider } from '../../../src';

interface IAppLayout extends ICustomTheme {
  canvas?: {
    fg: string;
    bg: string;
  };
}

const { ThemeZone, useTheme } = createThemedModule<'app', IAppLayout>();

export const withThemes = (themes: any[], zones: object) =>
  makeDecorator({
    name: 'withThemes',
    wrapper: (story: any, context: any) => {
      // @ts-ignore
      return (
        <ThemeContainer channel={addons.getChannel()} themes={themes} zones={zones}>
          {story(context)}
        </ThemeContainer>
      );
    },
  });

const App: FunctionComponent<Partial<{ children: ReactNode }>> = ({ children }) => {
  const theme = useTheme();

  return (
    <Flex
      backgroundColor={theme.canvas && theme.canvas.bg}
      color={theme.canvas && theme.canvas.fg}
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

      <Flex overflow="visible" m="auto" p="75px 0" className="PreviewContainer">
        {children}
      </Flex>
    </Flex>
  );
};

class ThemeContainer extends Component<any, any> {
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
    const { zones } = this.props;

    return (
      <ThemeProvider theme={{ base: themeName }} zones={zones}>
        <ThemeZone name="app">
          <App {...this.props} />
        </ThemeZone>
      </ThemeProvider>
    );
  }
}
