/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface IContainer extends IBox {}

export const Container: FunctionComponent<IContainer> = props => {
  const css = containerStyles();

  return jsx(Box, {
    ...props,
    css,
  });
};

export const containerStyles = () => {
  const theme = useTheme();

  return [
    {
      color: theme.container.fg,
      backgroundColor: theme.container.bg,
    },
  ];
};
