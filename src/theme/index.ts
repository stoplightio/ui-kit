import { IThemeInterface } from '../types';

import { base } from './base';
import { colors, components } from './components';

export const baseTheme: IThemeInterface = {
  base,

  ...colors,
  ...components,
};
