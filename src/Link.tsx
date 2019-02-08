import * as React from 'react';

import { IText, Text } from './Text';
import { useTheme } from './theme';

export interface ILink extends IText<HTMLAnchorElement | HTMLElement> {}

export const Link: React.FunctionComponent<ILink> = props => {
  const { as = 'a', ...rest } = props;

  return <Text {...rest} as={as} css={linkStyles()} />;
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
