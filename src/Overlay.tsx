/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { Box, IBox, IBoxCSS } from './Box';
import { useTheme } from './theme';

export const Overlay: FunctionComponent<IOverlay> = props => {
  const css = overlayStyles();

  return <Box css={css} {...props} />;
};

export interface IOverlayProps {}

export interface IOverlay extends IOverlayProps, IBox<HTMLElement> {}

export const overlayStyles = (): IBoxCSS => {
  const theme = useTheme();

  return {
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.overlay.bg,
    zIndex: 2 ** 31 - 2, // maximum 32bit int - 1 (offset, so that you can still override the overlay just in case)
  };
};
