/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';

import { Box, IBox } from './Box';

export const Text: FunctionComponent<IText> = props => {
  const {
    as = 'p',
    decoration: textDecoration,
    decorationColor: textDecorationColor,
    leading: lineHeight,
    casing: textTransform,
    tracking: letterSpacing,
    italic,
    ...rest
  } = props;

  const css = [...textStyles()];

  return jsx(Box, {
    ...rest,
    letterSpacing,
    lineHeight,
    textDecoration,
    textDecorationColor,
    textTransform,
    fontStyle: italic ? 'italic' : undefined,
    as,
    css,
  });
};

export interface IText extends ITextProps, IBox, HTMLAttributes<HTMLParagraphElement> {}

export interface ITextProps {
  leading?: IBox['lineHeight'];
  decoration?: IBox['textDecoration'];
  decorationColor?: IBox['textDecorationColor'];
  casing?: IBox['textTransform'];
  italic?: boolean;
}

export const textStyles = () => [
  {
    margin: '0',
  },
];
