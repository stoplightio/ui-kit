import * as React from 'react';
import { Box, IBox } from './Box';
import { ITheme, useTheme } from './theme';

export interface IBlockQuote extends IBox<HTMLQuoteElement | HTMLElement> {}

export const BlockQuote: React.FunctionComponent<IBlockQuote> = React.forwardRef<
  HTMLQuoteElement | HTMLElement,
  IBlockQuote
>((props, ref) => {
  const { as = 'blockquote', css, ...rest } = props;

  const { blockQuote } = useTheme();

  return <Box {...rest} as={as} ref={ref} css={[blockQuoteStyles(blockQuote), css]} />;
});

export const blockQuoteStyles = (theme: ITheme['blockQuote']) => {
  return {
    color: theme.fg,
    backgroundColor: theme.bg,
    boxShadow: theme.shadow,
    borderLeft: `6px solid ${theme.border}`,
    padding: '20px 30px 20px 20px',
    margin: 0,
    borderRadius: 2,
  };
};
