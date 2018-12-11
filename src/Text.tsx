/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';

export const Text: FunctionComponent<IText> = props => {
  const { as = 'p', leading: lineHeight, casing: textTransform, tracking: letterSpacing, italic, ...rest } = props;

  const css = [...textStyles()];

  return jsx(Box, {
    ...rest,
    letterSpacing,
    lineHeight,
    textTransform,
    fontStyle: italic ? 'italic' : undefined,
    as,
    css,
  });
};

export interface IText<T extends HTMLElement = HTMLParagraphElement> extends ITextProps, IBox<T> {}

export interface ITextProps {
  leading?: IBox['lineHeight'];
  casing?: IBox['textTransform'];
  italic?: boolean;
}

export const textStyles = () => [
  {
    margin: '0',
  },
];
