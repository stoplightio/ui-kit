import { Resolver } from '@stoplight/json-ref-resolver';
import * as React from 'react';

import { baseTheme } from './theme';
import { IThemeInterface } from './types';
import { ThemeProvider as StyledProvider } from './utils';

const resolver = new Resolver({
  getRef(_key, val) {
    if (typeof val === 'string' && val.startsWith('#/')) return val;
    return;
  },
});

export interface IThemeProviderProps {
  theme?: IThemeInterface;
  children?: any;
}
export const ThemeProvider = (props: IThemeProviderProps) => {
  let theme: any = Object.assign({}, baseTheme, props.theme);

  React.useEffect(() => {
    resolver.resolve(theme).then(res => {
      if (res.errors && res.errors.length > 0) {
        theme = baseTheme;
      } else if (res.result) {
        theme = res.result;
      }
    });
  });

  return <StyledProvider theme={theme}>{props.children}</StyledProvider>;
};
