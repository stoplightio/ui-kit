import { IThemeInterface } from '../types';

import { base } from './base';
import { colors, components, shadows } from './components';

export const baseTheme: IThemeInterface = {
  base,

  ...shadows,
  ...colors,
  ...components,
};
