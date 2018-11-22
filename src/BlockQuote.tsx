import * as React from 'react';
import { Box, IBoxProps } from './Box';

export interface IBlockQuoteProps {
  attributes?: IBoxProps;
  children: any;
  isSelected?: boolean;
}

export const BlockQuote = ({ attributes, children, isSelected }: IBlockQuoteProps) => (
  <Box
    as="blockquote"
    fg="blockQuote.fg"
    pl="xl"
    borderLeft="3px solid"
    borderColor="blockQuote.borderColor"
    shadow={isSelected ? 'blockQuote.shadow' : undefined}
    {...attributes}
  >
    {children}
  </Box>
);
