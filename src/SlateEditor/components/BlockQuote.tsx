import * as React from 'react';
import { Box, IBoxProps } from '../../Box';

export interface IBlockQuoteProps extends IBoxProps {
  attributes?: IBoxProps;
  children: any;
  isSelected?: boolean;
}

export const BlockQuote = ({ attributes, children, isSelected }: IBlockQuoteProps) => (
  <Box
    as="blockquote"
    fg="slateEditor.blockQuote.fg"
    pl="xl"
    borderLeft="3px solid"
    borderColor="slateEditor.blockQuote.borderColor"
    shadow={isSelected ? 'slateEditor.blockQuote.shadow' : undefined}
    {...attributes}
  >
    {children}
  </Box>
);
