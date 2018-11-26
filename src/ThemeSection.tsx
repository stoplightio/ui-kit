import { get, merge } from 'lodash';
import * as React from 'react';

import { base } from './theme/base';
import { ThemeProvider } from './ThemeProvider';
import { ISectionTheme, IThemeInterface } from './types';
import { withTheme } from './utils';

interface IThemeSectionProps {
  theme?: IThemeInterface;
  sectionTheme?: ISectionTheme;
  section: string;
  children?: any;
}

export class ThemeSectionBase extends React.Component<IThemeSectionProps> {
  private computedTheme() {
    const { section, theme, sectionTheme } = this.props;

    // merge base at the end so that the user can change the  base layout options like spacing
    return merge({}, theme, get(theme, ['sections', section], {}), sectionTheme || {}, base);
  }

  public render() {
    // FIXME: weird ts error here
    // @ts-ignore
    return <ThemeProvider theme={this.computedTheme()}>{this.props.children}</ThemeProvider>;
  }
}

export const ThemeSection = withTheme(ThemeSectionBase);
