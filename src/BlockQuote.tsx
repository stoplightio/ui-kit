import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export const BlockQuote: FunctionComponent<IBlockQuote> = props => {
  const { as = 'blockquote', isSelected, ...rest } = props;

  const css = blockQuoteStyles({ isSelected });

  return jsx(Box, {
    ...rest,
    as,
    css,
  });
};

export interface IBlockQuote extends IBlockQuoteProps, IBox, HTMLAttributes<HTMLTextAreaElement> {}

export interface IBlockQuoteProps {
  isSelected?: boolean;
}

export const blockQuoteStyles = ({ isSelected }: IBlockQuoteProps) => {
  const theme = useTheme();

  return [
    /* todo:
      {
         pl="@xl"
         borderLeft="@sm"
      }
    */
    {
      color: theme.blockQuote.fg,
      borderColor: theme.blockQuote.borderColor,
    },
    isSelected && {
      boxShadow: theme.blockQuote.shadow,
    },
  ];
};
