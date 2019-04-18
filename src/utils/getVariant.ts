import { ITheme } from '../theme';
import { Variant } from '../types';

export const getVariant = (
  baseTheme: ITheme['checkbox'] | ITheme['textarea'] | ITheme['input'] | ITheme['select'] | ITheme['tooltip'],
  variant: Variant = Variant.Default
) => {
  switch (variant) {
    case Variant.Invalid:
      return {
        fg: baseTheme.invalidFg,
        bg: baseTheme.invalidBg,
        border: baseTheme.invalidBorder,
        ...('invalidChecked' in baseTheme && { checked: baseTheme.invalidChecked }),
      };
    case Variant.Warning:
      return {
        fg: baseTheme.warningFg,
        bg: baseTheme.warningBg,
        border: baseTheme.warningBorder,
        ...('warningChecked' in baseTheme && { checked: baseTheme.warningChecked }),
      };
    default:
      return null;
  }
};
