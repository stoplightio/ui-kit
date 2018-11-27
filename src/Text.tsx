import { Box, IBoxProps } from './Box';
import { LetterSpacingVal, LineHeightVal } from './types';
import { casing, decoration, decorationColor, fontStyle, letterSpacing, lineHeight, styled } from './utils';

type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through' | 'initial' | 'inherit';

export interface ITextProps extends IBoxProps {
  tracking?: LetterSpacingVal;
  leading?: LineHeightVal;
  // TODO customizae to use lodash from more more options like snakecase
  casing?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit';
  decoration?: TextDecoration | TextDecoration[];
  decorationColor?: string;
  italic?: boolean;
}

export const Text = styled<ITextProps, 'p'>(Box as any).attrs({
  as: 'p',
  m: '@none',
})(casing, decoration, decorationColor, fontStyle, lineHeight, letterSpacing);
