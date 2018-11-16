import { Box, IBoxProps } from './Box';
import { ILetterSpacing, ILineHeight, ValueOf } from './types';
import { casing, decoration, decorationColor, fontStyle, letterSpacing, lineHeight, styled } from './utils';

type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through' | 'initial' | 'inherit';

export interface ITextProps extends IBoxProps {
  tracking?: ValueOf<ILetterSpacing>;
  leading?: ValueOf<ILineHeight>;
  // TODO customizae to use lodash from more more options like snakecase
  casing?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit';
  decoration?: TextDecoration | TextDecoration[];
  decorationColor?: string;
  italic?: boolean;
}

export const Text = styled<ITextProps, 'p'>(Box as any)(
  casing,
  decoration,
  decorationColor,
  fontStyle,
  lineHeight,
  letterSpacing
);

Text.defaultProps = {
  as: 'p',
};
