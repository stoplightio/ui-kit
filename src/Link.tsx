import * as React from 'react';
import { Box, IBox, IBoxCSS } from './Box';
import { useTheme } from './theme';

export interface ILink extends IBox<HTMLAnchorElement> {}

export const Link = React.forwardRef<HTMLAnchorElement, ILink>((props, ref) => {
  const { css, ...rest } = props;
  return <Box {...rest} as="a" ref={ref} css={linkStyles(css)} />;
});

export const linkStyles = (css: IBoxCSS) => {
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
    css,
  ];
};
