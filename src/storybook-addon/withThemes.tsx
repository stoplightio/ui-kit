import * as React from 'react';

// @ts-ignore
import addons, { makeDecorator } from '@storybook/addons';
import merge = require('lodash/merge');

import { Flex } from '../Flex';
import { baseTheme } from '../theme';
import { ThemeProvider } from '../utils';

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
    const { themes } = this.props;

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

          <Flex
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            style={{ overflow: 'auto', padding: '75px 0' }}
            justify="center"
            className="PreviewContainer"
          >
            {this.props.children}
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}
