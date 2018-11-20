import { IThemeInterface } from '../types';

import * as styledComponents from 'styled-components';

const { default: styled, keyframes, ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export { keyframes, styled, ThemeProvider };

export * from './rules';

export { themeGet } from 'styled-system';
