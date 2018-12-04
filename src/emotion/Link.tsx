/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export const Link: FunctionComponent<ILink> = props => {
  const css = linkStyles();

  return jsx(Box, {
    ...props,
    as: 'a',
    css,
  });
};

export interface ILink extends IBox, HTMLAttributes<HTMLAnchorElement> {}

export const linkStyles = () => {
  const theme = useTheme();

  return {
    color: theme.canvas.link,
  };
};
