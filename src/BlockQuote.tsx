import * as React from 'react';
import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface IBlockQuote extends IBox<HTMLQuoteElement | HTMLElement> {}

export const BlockQuote = React.forwardRef<HTMLQuoteElement | HTMLElement, IBlockQuote>((props, ref) => {
  const { as = 'blockquote', css, ...rest } = props;

  return <Box {...rest} as={as} ref={ref} css={[blockQuoteStyles(), css]} />;
});

export const blockQuoteStyles = () => {
  const { blockQuote } = useTheme();

  return {
    color: blockQuote.fg,
    backgroundColor: blockQuote.bg,
    boxShadow: blockQuote.shadow,
    borderLeft: `6px solid ${blockQuote.border}`,
    padding: '20px 30px 20px 20px',
    margin: 0,
    borderRadius: 2,
  };
};
