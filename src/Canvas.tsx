/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface ICanvas {
  fg?: string;
  bg?: string;
}

export const Canvas: FunctionComponent<ICanvas & IBox> = ({ fg, bg, ...rest }) => {
  const theme = useTheme();
  // Note: using this comparison so we can still set fg and bg to empty string.
  if (fg == null && theme.canvas && theme.canvas.fg) fg = theme.canvas.fg;
  if (bg == null && theme.canvas && theme.canvas.bg) bg = theme.canvas.bg;

  return <Box {...rest} color={fg} backgroundColor={bg} />;
};
