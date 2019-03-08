import * as React from 'react';

import { Box, IBox, ITheme, useTheme } from './';

export enum BadgeVariant {
  Pill = 'pill',
  Textual = 'textual',
  Dot = 'dot',
}

export enum BadgeColor {
  Error = 'error',
  Warning = 'warning',
  Default = 'default',
}

export interface IBadge extends IBox<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
}

const Badge: React.FunctionComponent<IBadge> = props => {
  const { color = BadgeColor.Default, variant = BadgeVariant.Pill, children, ...restProps } = props;

  const { badge: theme } = useTheme();

  return (
    <Box {...restProps} as="span" css={badgeStyles({ color, variant, theme })}>
      {variant === BadgeVariant.Dot ? null : children}
    </Box>
  );
};

const badgeStyles = ({
  color,
  variant,
  theme,
}: {
  color: BadgeColor;
  variant: BadgeVariant;
  theme: ITheme['badge'];
}) => {
  return [
    {
      padding: '.25em 0',
      fontSize: '75%',
      fontWeight: 700,
      lineHeight: 1,
      borderRadius: '16px',
      color: theme[color].fg,
      backgroundColor: theme[color].bg,
      margin: '0 2px',
    },
    variant === BadgeVariant.Textual && {
      color: theme[color].bg,
      backgroundColor: 'transparent',
    },
    variant === BadgeVariant.Pill && {
      padding: '.25em .6em',
    },
    variant === BadgeVariant.Dot && {
      padding: '0',
      width: '8px',
      height: '8px',
      display: 'inline-block',
    },
  ];
};

export { Badge };
