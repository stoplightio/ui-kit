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
      backgroundColor: theme.container.bg,
      borderColor: theme.container.border,
      color: theme.container.fg,

      ':hover': {
        backgroundColor: theme.container.hoverBg || theme.container.bg,
        color: theme.container.hoverFg || theme.container.fg,
      },
    },
  ];
};
