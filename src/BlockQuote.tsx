/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { IText, Text } from './Text';
import { useTheme } from './theme';

export const BlockQuote: FunctionComponent<IBlockQuote> = props => {
  const { as = 'blockquote', isSelected, ...rest } = props;

  const css = blockQuoteStyles({ isSelected });

  return jsx(Text, {
    ...rest,
    as,
    css,
  });
};

export interface IBlockQuote extends IBlockQuoteProps, IText<HTMLQuoteElement | HTMLElement> {}

export interface IBlockQuoteProps {
  isSelected?: boolean;
}

export const blockQuoteStyles = ({ isSelected }: IBlockQuoteProps) => {
  const theme = useTheme();

  return [
    {
      padding: '15px 25px',
      borderLeft: '5px solid',
      maxWidth: '80%',
      color: theme.blockQuote.fg,
      borderColor: theme.blockQuote.border,
    },
    isSelected && {
      boxShadow: theme.blockQuote.shadow,
    },
  ];
};
