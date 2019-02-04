/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { IText, Text } from './Text';
import { useTheme } from './theme';

export interface ILink extends IText<HTMLAnchorElement | HTMLElement> {}

export const Link: FunctionComponent<ILink> = props => {
  const { as = 'a', ...rest } = props;

  const css = linkStyles();

  return jsx(Text, {
    ...rest,
    as,
    css,
  });
};

export const linkStyles = () => {
  const { link } = useTheme();

  return [
    {
      color: link.fg,
    },
    link.hoverFg && {
      ':hover': {
        color: link.hoverFg,
      },
    },
    link.visitedFg && {
      ':visited': {
        color: link.visitedFg,
      },
    },
  ];
};
