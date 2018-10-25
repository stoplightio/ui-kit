import { get, merge } from 'lodash';
import * as React from 'react';
import * as styledComponents from 'styled-components';

import { ISectionTheme, IThemeInterface } from '../types';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

interface IThemeSectionProps {
  theme?: ISectionTheme;
  section: string;
  children?: any;
}

export class ThemeSection extends React.Component<IThemeSectionProps, {}> {
  private computedTheme() {
    const { section, theme: propsTheme } = this.props;

    return (theme: IThemeInterface) =>
      merge({}, theme, get(theme, ['sections', section], {}), propsTheme || {});
  }

  public render() {
    return <ThemeProvider theme={this.computedTheme()}>{this.props.children}</ThemeProvider>;
  }
}
