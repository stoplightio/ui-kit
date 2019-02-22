/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

const capitalize = require('lodash/capitalize');

import { Box, IBox, IBoxCSS } from './Box';

import { Flex } from './Flex';
import { useTheme } from './theme';

export interface ITooltip extends IBox<HTMLDivElement> {
  invalid?: boolean;
  posX?: 'left' | 'center' | 'right';
  posY?: 'top' | 'center' | 'bottom';
}

export const Tooltip: React.FunctionComponent<ITooltip> = props => {
  const { children, ...rest } = props;

  return (
    <Box {...rest} css={tooltipStyles(props)}>
      <Box position="absolute" style={caretStyles(props)} />
      <Flex justifyContent="center" alignItems="center" position="relative">
        <Box style={contentStyles(props)}>{children}</Box>
      </Flex>
    </Box>
  );
};

const tooltipStyles = ({ invalid, posX = 'left', posY = 'top' }: ITooltip): IBoxCSS => {
  const { tooltip: baseTheme } = useTheme();

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
      borderRadius: '3px',
      margin: 0,
      ...margin,
    },
  ];
};

const contentStyles = ({ invalid }: ITooltip): IBoxCSS => {
  const { tooltip: baseTheme } = useTheme();

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
      padding: 0,
    },
  ];
};

const caretStyles = ({ invalid, posX = 'left', posY = 'top' }: ITooltip): React.CSSProperties => {
  const { tooltip: baseTheme } = useTheme();

  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  const pstyles: React.CSSProperties = {};

  pstyles.width = `${sz}px`;
  pstyles.height = `${sz}px`;
  pstyles.border = `${b}px solid ${theme.border}`;
  pstyles.backgroundColor = theme.bg;
  if (posY === 'bottom') {
    if (posX === 'right') {
      caretCorner(pstyles, 'top', 'left');
      rotate(pstyles, 'top', 'right');
      pstyles.top = `-${b}px`;
      pstyles.right = `${sz}px`;
    } else if (posX === 'center') {
      caretCorner(pstyles, 'top', 'left');
      rotateCenterCenter(pstyles);
      pstyles.top = `-${b + sz / 2}px`;
      pstyles.left = `calc(50% - ${caretHeight}px)`;
    } else if (posX === 'left') {
      caretCorner(pstyles, 'top', 'right');
      rotate(pstyles, 'top', 'left');
      pstyles.top = `-${b}px`;
      pstyles.left = `${sz}px`;
    }
  } else if (posY === 'top') {
    if (posX === 'right') {
      caretCorner(pstyles, 'bottom', 'left');
      rotate(pstyles, 'bottom', 'right');
      pstyles.bottom = `-${b}px`;
      pstyles.right = `${sz}px`;
    } else if (posX === 'center') {
      caretCorner(pstyles, 'bottom', 'right');
      rotateCenterCenter(pstyles);
      pstyles.bottom = `-${b + sz / 2}px`;
      pstyles.left = `calc(50% - ${caretHeight}px)`;
    } else if (posX === 'left') {
      caretCorner(pstyles, 'bottom', 'right');
      rotate(pstyles, 'bottom', 'left');
      pstyles.bottom = `-${b}px`;
      pstyles.left = `${sz}px`;
    }
  } else if (posY === 'center') {
    if (posX === 'right') {
      caretCorner(pstyles, 'top', 'left');
      rotate(pstyles, 'top', 'left');
      pstyles.left = `-${b + caretHeight}px`;
      pstyles.top = '50%';
    } else if (posX === 'center') {
      pstyles.visibility = 'hidden';
    } else if (posX === 'left') {
      caretCorner(pstyles, 'top', 'right');
      rotate(pstyles, 'top', 'right');
      pstyles.right = `-${b + caretHeight}px`;
      pstyles.top = '50%';
    }
  }

  return pstyles;
};

// CONSTANTS
const b = 1; // border width
const sz = 20; // length of caret's side
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

const rotate = (styles: React.CSSProperties, side1: 'top' | 'bottom', side2: 'right' | 'left') => {
  styles.transformOrigin = `${side1} ${side2}`;
  const signs = [[-1, 1], [1, -1]];
  const sign = signs[side1 === 'top' ? 0 : 1][side2 === 'left' ? 0 : 1];
  const deg = 45 * sign;
  styles.transform = `rotate(${deg}deg)`;
};

const rotateCenterCenter = (styles: React.CSSProperties) => {
  styles.transform = 'rotate(45deg)';
};

// This helper removes the border from two sides of the caret depending on which
// corner is the caret's tip.
const caretCorner = (styles: React.CSSProperties, side1: Side, side2: Side) => {
  styles[opposingBorderWidth(side1)] = 0;
  styles[opposingBorderWidth(side2)] = 0;
};
