/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, IBox, IBoxCSS } from './Box';

import { Flex } from './Flex';
import { useTheme } from './theme';

export interface ITooltipCaret {
  posX?: 'left' | 'center' | 'right';
  posY?: 'top' | 'center' | 'bottom';
}

export interface ITooltip extends IBox<HTMLDivElement> {
  invalid?: boolean;
  caret?: ITooltipCaret;
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

const tooltipStyles = ({ invalid }: ITooltip): IBoxCSS => {
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
      color: theme.fg,
      backgroundColor: theme.bg,
      border: `1px solid ${theme.border || theme.fg}`,
      position: 'relative',
      borderRadius: '3px',
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

const caretStyles = ({ invalid, caret = {} }: ITooltip): React.CSSProperties => {
  const { tooltip: baseTheme } = useTheme();
  const { posX = 'left', posY = 'top' } = caret;

  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  const pstyles: React.CSSProperties = {};
  const sz = 20; // length of caret's side
  const b = 1; // border width

  pstyles.width = `${sz}px`;
  pstyles.height = `${sz}px`;
  pstyles.border = `${b}px solid ${theme.border}`;
  pstyles.backgroundColor = theme.bg;
  if (posY === 'bottom') {
    if (posX === 'right') {
      pstyles.transformOrigin = 'top right';
      pstyles.transform = 'rotate(45deg)';
      pstyles.borderBottomWidth = 0;
      pstyles.borderRightWidth = 0;
      pstyles.top = `-${b}px`;
      pstyles.right = `${sz}px`;
    } else if (posX === 'center') {
      pstyles.transform = 'rotate(45deg)';
      pstyles.borderBottomWidth = 0;
      pstyles.borderRightWidth = 0;
      pstyles.top = `-${sz / 2 + b}px`;
      pstyles.left = '50%';
    } else if (posX === 'left') {
      pstyles.transformOrigin = 'top left';
      pstyles.transform = 'rotate(-45deg)';
      pstyles.borderBottomWidth = 0;
      pstyles.borderLeftWidth = 0;
      pstyles.top = `-${b}px`;
      pstyles.left = `${sz}px`;
    }
  } else if (posY === 'top') {
    if (posX === 'right') {
      pstyles.transformOrigin = 'bottom right';
      pstyles.transform = 'rotate(-45deg)';
      pstyles.borderTopWidth = 0;
      pstyles.borderRightWidth = 0;
      pstyles.bottom = `-${b}px`;
      pstyles.right = `${sz}px`;
    } else if (posX === 'center') {
      pstyles.transform = 'rotate(45deg)';
      pstyles.borderTopWidth = 0;
      pstyles.borderLeftWidth = 0;
      pstyles.bottom = `-${sz / 2 + b}px`;
      pstyles.left = '50%';
    } else if (posX === 'left') {
      pstyles.transformOrigin = 'bottom left';
      pstyles.transform = 'rotate(45deg)';
      pstyles.borderTopWidth = 0;
      pstyles.borderLeftWidth = 0;
      pstyles.bottom = `-${b}px`;
      pstyles.left = `${sz}px`;
    }
  } else if (posY === 'center') {
    if (posX === 'right') {
      pstyles.transformOrigin = 'top left';
      pstyles.transform = 'rotate(-45deg)';
      pstyles.borderRightWidth = 0;
      pstyles.borderBottomWidth = 0;
      pstyles.left = `-${(sz * Math.SQRT2) / 2 + b}px`;
      pstyles.top = '50%';
    } else if (posX === 'center') {
      pstyles.visibility = 'hidden';
    } else if (posX === 'left') {
      pstyles.transformOrigin = 'top right';
      pstyles.transform = 'rotate(45deg)';
      pstyles.borderLeftWidth = 0;
      pstyles.borderBottomWidth = 0;
      pstyles.right = `-${(sz * Math.SQRT2) / 2 + b}px`;
      pstyles.top = '50%';
    }
  }

  return pstyles;
};
