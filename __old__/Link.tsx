import * as React from 'react';

import { Box, IBoxProps } from './Box';

export interface ILinkProps {
  attributes?: IBoxProps;
  children: any;
  href: string;
  title: string;
}

export const Link = ({ attributes, children, href, title }: ILinkProps) => (
  // @ts-ignore
  <Box as="a" fg="link" {...attributes} href={href} title={title}>
    {children}
  </Box>
);
