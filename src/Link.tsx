import * as React from 'react';
import { Box, IBox, IBoxCSS } from './Box';
import { ITheme, useTheme } from './theme';

export interface ILink extends IBox<HTMLAnchorElement> {}

const Link: React.FunctionComponent<ILink> = React.forwardRef<HTMLAnchorElement, ILink>(function Link(props, ref) {
  const { css, ...rest } = props;

  const { link } = useTheme();

  return <Box {...rest} as="a" ref={ref} css={linkStyles(link, css)} />;
});

export const linkStyles = (theme: ITheme['link'], css: IBoxCSS) => {
  return [
    {
      color: theme.fg,
      textDecoration: 'none',
      padding: '0 3px',
    },
    theme.bg && {
      backgroundColor: theme.bg,
    },
    theme.hoverBg && {
      ':hover': {
        backgroundColor: theme.hoverBg,
      },
    },
    theme.hoverFg && {
      ':hover': {
        color: theme.hoverFg,
      },
    },
    theme.visitedFg && {
      ':visited': {
        color: theme.visitedFg,
      },
    },
    theme.border && {
      borderBottom: `1px solid ${theme.border}`,
    },
    theme.hoverBorder && {
      ':hover': {
        borderColor: theme.hoverBorder,
      },
    },
    css,
  ];
};

Link.displayName = 'Link';
export { Link };
