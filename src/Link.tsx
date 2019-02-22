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
      padding: '0 3px',
    },
    link.bg && {
      backgroundColor: link.bg,
    },
    link.hoverBg && {
      ':hover': {
        backgroundColor: link.hoverBg,
      },
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
    link.border && {
      borderBottom: `1px solid ${link.border}`,
    },
    link.hoverBorder && {
      ':hover': {
        borderColor: link.hoverBorder,
      },
    },
    css,
  ];
};
