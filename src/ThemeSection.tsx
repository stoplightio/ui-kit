import { get, merge } from 'lodash';
import * as React from 'react';

import { base } from './theme/base';
import { ISectionTheme, IThemeInterface } from './types';

import { ThemeProvider } from './ThemeProvider';

interface IThemeSectionProps {
  theme?: ISectionTheme;
  section: string;
  children?: any;
}

export class ThemeSection extends React.Component<IThemeSectionProps> {
  private computedTheme() {
    const { section, theme: propsTheme } = this.props;

    // merge base at the end so that the user can change the  base layout options like spacing
    return (theme: IThemeInterface) => merge({}, theme, get(theme, ['sections', section], {}), propsTheme || {}, base);
  }

  public render() {
    // FIXME: weird ts error here
    // @ts-ignore
    return <ThemeProvider theme={this.computedTheme()}>{this.props.children}</ThemeProvider>;
  }
}
