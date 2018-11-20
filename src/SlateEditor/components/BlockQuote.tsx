import { Box, IBoxProps } from '../../Box';
import { styled } from '../../utils';

export interface IBlockQuoteProps extends IBoxProps {}

export const BlockQuote = styled<IBlockQuoteProps>(Box as any).attrs({
  pl: 'xl',
  css: {
    borderLeft: '3px solid',
  },
})``;

BlockQuote.defaultProps = {
  as: 'blockquote',
};
