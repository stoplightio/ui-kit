import * as React from 'react';

import { Box, IBox } from './Box';

export enum BadgeVariant {
  Pill = 'pill',
  Textual = 'textual',
}

export enum BadgeColor {
  Error = 'error',
  Warning = 'warning',
  Default = 'default',
}

const colorMap = {
  [BadgeColor.Error]: '#dc3546',
  [BadgeColor.Warning]: '#ffc108',
  [BadgeColor.Default]: '#6c757e',
};

export interface IBadge extends IBox<HTMLElement> {
  label: string;
  fixedWidth?: boolean;
  inverse?: boolean;
  listItem?: boolean;
  variant?: BadgeVariant;
  color?: BadgeColor;
}

export const Badge: React.FunctionComponent<IBadge> = props => {
  const { label, color = BadgeColor.Error, variant = BadgeVariant.Pill, ...restProps } = props;

  return (
    <Box {...restProps} as="span" css={badgeStyles({ color, variant })}>
      {label}
    </Box>
  );
};

const badgeStyles = ({ color, variant }: { color: BadgeColor; variant: BadgeVariant }) => [
  {
    padding: '.25em .6em',
    fontSize: '75%',
    fontWeight: 700,
    lineHeight: 1,
    borderRadius: '10rem',
  },
  variant === BadgeVariant.Pill && {
    color: color === BadgeColor.Warning ? '#21252a' : 'white',
    backgroundColor: colorMap[color],
  },
  variant === BadgeVariant.Textual && {
    color: colorMap[color],
    backgroundColor: 'transparent',
  },
];
