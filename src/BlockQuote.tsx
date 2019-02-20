import * as React from 'react';
import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface IBlockQuote extends IBox<HTMLQuoteElement | HTMLElement> {}

export const BlockQuote: React.FunctionComponent<IBlockQuote> = props => {
  const { as = 'blockquote', ...rest } = props;

  return <Box {...rest} as={as} css={blockQuoteStyles()} />;
};

export const blockQuoteStyles = () => {
  const { blockQuote } = useTheme();

  return {
    color: blockQuote.fg,
    backgroundColor: blockQuote.bg,
    boxShadow: blockQuote.shadow,
    padding: '.85rem 1.3rem',
    margin: '.5rem auto',
    borderLeft: `6px solid ${blockQuote.border}`,
  };
};
