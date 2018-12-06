import { IThemeInterface } from '../types';

import * as styledComponents from 'styled-components';

const {
  default: styled,
  keyframes,
  ThemeProvider,
  withTheme,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export { keyframes, styled, ThemeProvider, withTheme };

export * from './rules';

export { themeGet } from 'styled-system';
