/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

const capitalize = require('lodash/capitalize');

import { Box, IBox, IBoxCSS } from './Box';
import { Flex } from './Flex';
import { ITheme, useTheme } from './theme';

export interface ITooltip extends IBox<HTMLDivElement> {
  invalid?: boolean;
  posX?: 'left' | 'center' | 'right';
  posY?: 'top' | 'center' | 'bottom';
}

export const Tooltip = React.forwardRef<HTMLDivElement, ITooltip>((props, ref) => {
  const { children, posX, posY, invalid, css, ...rest } = props;

  const { tooltip: theme } = useTheme();

  return (
    <Box {...rest} css={tooltipStyles(theme, props)} ref={ref}>
      <Caret {...props} />
      <Flex position="relative">
        <Box style={contentStyles(theme, props)}>{children}</Box>
      </Flex>
    </Box>
  );
});

// This is exported mostly to make testing easier :-)
export const Caret = React.forwardRef<HTMLDivElement, ITooltip>((props, ref) => {
  const { tooltip: theme } = useTheme();
  return <Box position="absolute" style={caretStyles(theme, props)} ref={ref} />;
});

const tooltipStyles = (
  baseTheme: ITheme['tooltip'],
  { invalid, posX = 'left', posY = 'top', css }: ITooltip
): IBoxCSS => {
  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  const margin: React.CSSProperties = {};
  if (posY !== 'center') {
    margin[opposingMargin(posY)] = `${caretHeight}px`;
  } else if (posY === 'center' && posX !== 'center') {
    margin[opposingMargin(posX)] = `${caretHeight}px`;
  }

  return [
    {
      color: theme.fg,
      backgroundColor: theme.bg,
      border: `1px solid ${theme.border || theme.fg}`,
      position: 'relative',
      borderRadius: 2,
      margin: 0,
      display: 'inline-block',
      maxWidth: 400,
      ...margin,
    },
    css,
  ];
};

const contentStyles = (baseTheme: ITheme['tooltip'], { invalid }: ITooltip): IBoxCSS => {
  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  return [
    {
      backgroundColor: theme.bg,
      margin: `2px 5px`,
      padding: 8,
    },
  ];
};

const caretStyles = (
  baseTheme: ITheme['tooltip'],
  { invalid, posX = 'left', posY = 'top' }: ITooltip
): React.CSSProperties => {
  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  const s: React.CSSProperties = {};
  s.width = `${sz}px`;
  s.height = `${sz}px`;
  s.border = `${b}px solid ${theme.border}`;
  s.backgroundColor = theme.bg;

  if (posY === 'bottom') {
    if (posX === 'right') {
      caretCorner(s, 'top', 'left');
      rotate(s, 'top', 'right');
      move(s, 'top', 'right');
    } else if (posX === 'center') {
      caretCorner(s, 'top', 'left');
      rotate(s, 'center', 'center');
      move(s, 'top', 'center');
    } else if (posX === 'left') {
      caretCorner(s, 'top', 'right');
      rotate(s, 'top', 'left');
      move(s, 'top', 'left');
    }
  } else if (posY === 'top') {
    if (posX === 'right') {
      caretCorner(s, 'bottom', 'left');
      rotate(s, 'bottom', 'right');
      move(s, 'bottom', 'right');
    } else if (posX === 'center') {
      caretCorner(s, 'bottom', 'right');
      rotate(s, 'center', 'center');
      move(s, 'bottom', 'center');
    } else if (posX === 'left') {
      caretCorner(s, 'bottom', 'right');
      rotate(s, 'bottom', 'left');
      move(s, 'bottom', 'left');
    }
  } else if (posY === 'center') {
    if (posX === 'right') {
      caretCorner(s, 'top', 'left');
      rotate(s, 'top', 'left');
      move(s, 'center', 'left');
    } else if (posX === 'center') {
      s.visibility = 'hidden';
    } else if (posX === 'left') {
      caretCorner(s, 'top', 'right');
      rotate(s, 'top', 'right');
      move(s, 'center', 'right');
    }
  }
  return s;
};

// CONSTANTS
const b = 1; // border width
const sz = 12; // length of caret's side
const caretHeight = (sz * Math.SQRT2) / 2;

// HELPERS
type Side = 'center' | 'left' | 'right' | 'top' | 'bottom';

const oppositeSide = (side: Side): Side => {
  switch (side) {
    case 'center':
      return 'center';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
  }
};

const opposingMargin = (side: Side) => 'margin' + capitalize(oppositeSide(side));

const opposingBorderWidth = (side: Side) => 'border' + capitalize(oppositeSide(side)) + 'Width';

const rotate = (
  styles: React.CSSProperties,
  side1: 'top' | 'bottom' | 'center',
  side2: 'right' | 'left' | 'center'
) => {
  if (side1 !== 'center' && side2 !== 'center') {
    styles.transformOrigin = `${side1} ${side2}`;
    const signs = [[-1, 1], [1, -1]];
    const sign = signs[side1 === 'top' ? 0 : 1][side2 === 'left' ? 0 : 1];
    const deg = 45 * sign;
    styles.transform = `rotate(${deg}deg)`;
  } else {
    styles.transform = 'rotate(45deg)';
  }
};

const move = (styles: React.CSSProperties, side1: 'top' | 'bottom' | 'center', side2: 'right' | 'left' | 'center') => {
  if (side1 !== 'center') {
    if (side2 !== 'center') {
      styles[side1] = `-${b}px`;
      styles[side2] = `${sz}px`;
    } else {
      styles[side1] = `-${b + sz / 2}px`;
      styles.left = `calc(50% - ${caretHeight}px)`;
    }
  } else {
    styles.top = '50%';
    styles[side2] = `-${b + caretHeight}px`;
  }
};

// This helper removes the border from two sides of the caret depending on which
// corner is the caret's tip.
const caretCorner = (styles: React.CSSProperties, side1: Side, side2: Side) => {
  styles[opposingBorderWidth(side1)] = 0;
  styles[opposingBorderWidth(side2)] = 0;
};
