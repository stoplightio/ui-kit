import * as React from 'react';

import { IText, Text } from './Text';
import { useTheme } from './theme';

export interface ILink extends IText<HTMLAnchorElement | HTMLElement> {}

export const Link = React.forwardRef<HTMLOrSVGElement, ILink>((props, ref) => {
  const { as = 'a', ...rest } = props;

  return <Text {...rest} as={as} ref={ref} css={linkStyles()} />;
});

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
