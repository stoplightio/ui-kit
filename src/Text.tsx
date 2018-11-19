import { Box, IBoxProps } from './Box';
import { ICSSProps, ILetterSpacing, ILineHeight, ValueOf } from './types';
import { casing, decoration, decorationColor, fontStyle, letterSpacing, lineHeight, styled } from './utils';

export interface ITextProps extends IBoxProps {
  tracking?: ValueOf<ILetterSpacing> | ICSSProps['letterSpacing'];
  leading?: ValueOf<ILineHeight> | ICSSProps['lineHeight'];
  // TODO customizae to use lodash from more more options like snakecase
  casing?: ICSSProps['textTransform'];
  decoration?: ICSSProps['textDecoration'] | Array<ICSSProps['textDecoration']>;
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
