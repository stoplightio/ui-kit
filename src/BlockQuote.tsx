/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { IText, Text } from './Text';
import { useTheme } from './theme';

export interface IBlockQuote extends IText<HTMLQuoteElement | HTMLElement> {
  isSelected?: boolean;
}

export const BlockQuote: FunctionComponent<IBlockQuote> = props => {
  const { as = 'blockquote', isSelected, ...rest } = props;

  return <Text {...rest} as={as} defaultCSS={blockQuoteStyles({ isSelected })} />;
};

export const blockQuoteStyles = ({ isSelected }: IBlockQuote) => {
  const { blockQuote } = useTheme();

  return [
    {
      color: blockQuote.fg,
      borderColor: blockQuote.border,

      padding: '15px 25px',
      borderLeft: '5px solid',
      maxWidth: '80%',
    },
    isSelected && {
      boxShadow: blockQuote.shadow,
    },
  ];
};
