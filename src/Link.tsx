/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export const Link: FunctionComponent<ILink> = props => {
  const { as = 'a', ...rest } = props;

  const css = [...linkStyles()];

  return jsx(Box, {
    ...rest,
    as,
    css,
  });
};

export interface ILink extends IBox, HTMLAttributes<HTMLAnchorElement> {}

export const linkStyles = () => {
  const theme = useTheme();

  return [
    {
      color: theme.link.fg,
    },
    theme.link.hoverFg && {
      ':hover': {
        color: theme.link.hoverFg,
      },
    },
    theme.link.visitedFg && {
      ':visited': {
        color: theme.link.visitedFg,
      },
    },
  ];
};
