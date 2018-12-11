/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { IText, Text } from './Text';
import { useTheme } from './theme';

export const Link: FunctionComponent<ILink> = props => {
  const { as = 'a', ...rest } = props;

  const css = linkStyles();

  return jsx(Text, {
    ...rest,
    as,
    css,
  });
};

export interface ILink extends IText<HTMLAnchorElement | HTMLElement> {}

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
