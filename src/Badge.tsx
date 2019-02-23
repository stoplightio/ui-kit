import * as React from 'react';

import { Box, IBox, ITheme, useTheme } from './';

export enum BadgeVariant {
  Pill = 'pill',
  Textual = 'textual',
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

export const Badge: React.FunctionComponent<IBadge> = props => {
  const { color = BadgeColor.Default, variant = BadgeVariant.Pill, ...restProps } = props;

  const { badge: theme } = useTheme();

  return <Box {...restProps} as="span" css={badgeStyles({ color, variant, theme })} />;
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
      padding: '.25em .6em',
      fontSize: '75%',
      fontWeight: 700,
      lineHeight: 1,
      borderRadius: '16px',
    },
    variant === BadgeVariant.Pill && {
      color: theme[color].fg,
      backgroundColor: theme[color].bg,
    },
    variant === BadgeVariant.Textual && {
      color: theme[color].bg,
      backgroundColor: 'transparent',
    },
  ];
};
