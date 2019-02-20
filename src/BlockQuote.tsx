import * as React from 'react';

import { IText, Text } from './Text';
import { useTheme } from './theme';

export interface IBlockQuote extends IText<HTMLQuoteElement | HTMLElement> {
  isSelected?: boolean;
}

export const BlockQuote = React.forwardRef<HTMLQuoteElement | HTMLElement, IBlockQuote>((props, ref) => {
  const { as = 'blockquote', isSelected, ...rest } = props;

  return <Text {...rest} as={as} ref={ref} css={blockQuoteStyles({ isSelected })} />;
});

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
