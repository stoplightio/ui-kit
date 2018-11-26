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
  const [theme, setTheme] = React.useState(Object.assign({}, baseTheme, props.theme));

  React.useEffect(
    () => {
      resolver.resolve(theme).then(res => {
        if (res.errors) {
          setTheme(baseTheme);
        } else if (res.result) {
          setTheme(res.result);
        }
      });
    },
    [theme]
  );

  return <StyledProvider theme={theme}>{props.children}</StyledProvider>;
};
