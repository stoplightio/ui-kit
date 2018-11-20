import * as React from 'react';
import { Box, IBoxProps } from '../../Box';

export interface IBlockQuoteProps extends IBoxProps {
  attributes?: IBoxProps;
  children: any;
}

export const BlockQuote = ({ attributes, children }: IBlockQuoteProps) => (
  <Box
    as="blockquote"
    fg="slateEditor.blockQuote.fg"
    pl="xl"
    borderLeft="3px solid"
    borderColor="slateEditor.blockQuote.borderColor"
    {...attributes}
  >
    {children}
  </Box>
);
