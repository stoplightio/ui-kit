import { IThemeInterface } from '../types';

import { base } from './base';
import { colors, components, scrollbars, shadows } from './components';

export const baseTheme: IThemeInterface = {
  base,

  ...shadows,
  ...colors,
  ...components,
  ...scrollbars,
};
