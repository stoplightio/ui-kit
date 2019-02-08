import * as React from 'react';

import { Box, IBox } from './Box';
import { Flex } from './Flex';
import { Overlay } from './Overlay';
import { Portal } from './Portal';
import { useTheme } from './theme';

export interface IDialog extends IBox<HTMLElement> {
  show?: boolean;
  onClickOutside?: React.ReactEventHandler<HTMLElement>;
}

export const Dialog: React.FunctionComponent<IDialog> = props => {
  const { children, show, onClickOutside, onClick, ...rest } = props;
  const css = dialogStyles();

  const onOverlayClick = React.useCallback<React.MouseEventHandler<HTMLElement>>(e => {
    if (onClickOutside !== undefined) {
      onClickOutside(e);
    }
  }, []);

  const onBoxClick = React.useCallback<React.MouseEventHandler<HTMLElement>>(e => {
    e.stopPropagation();
    if (onClick !== undefined) {
      onClick(e);
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Portal>
      <Overlay as={Flex} alignItems="center" justifyContent="center" onClick={onOverlayClick}>
        <Box {...rest} onClick={onBoxClick} css={css}>
          {children}
        </Box>
      </Overlay>
    </Portal>
  );
};

export const dialogStyles = () => {
  const { dialog } = useTheme();

  return {
    color: dialog.fg,
    backgroundColor: dialog.bg,
    border: dialog.border ? `1px solid ${dialog.border}` : 'none',

    // these ensure our dialog content won't leave the screen
    maxWidth: '95vw',
    maxHeight: '95vh',
  };
};
