import * as React from 'react';
import { Box, IBox, IBoxCSS } from './Box';
import { ITheme, useTheme } from './theme';

export interface IOverlay extends IBox<HTMLElement> {}

export const Overlay = React.forwardRef<HTMLElement, IOverlay>((props, ref) => {
  const { overlay: theme } = useTheme();

  return <Box {...props} ref={ref} css={overlayStyles(theme)} />;
});

export const overlayStyles = (theme: ITheme['overlay']): IBoxCSS => {
  return {
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.bg,
    zIndex: 2 ** 31 - 2, // maximum 32bit int - 1 (offset, so that you can still override the overlay just in case)
  };
};
