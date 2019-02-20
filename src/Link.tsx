import * as React from 'react';
import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface ILink extends IBox<HTMLAnchorElement> {}

export const Link = React.forwardRef<HTMLAnchorElement, ILink>((props, ref) => {
  return <Box {...props} as="a" ref={ref} css={linkStyles()} />;
};

export const linkStyles = () => {
  const { link } = useTheme();

  return [
    {
      color: link.fg,
      textDecoration: 'none',
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
