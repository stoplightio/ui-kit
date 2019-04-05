import { ContextMenu as BPContextMenu } from '@blueprintjs/core';
import * as React from 'react';

/**
 * CONTEXT MENU
 */

type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type ContextMenuEventFunc = (event: ContextMenuEvent) => void;

interface IContectMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  target: React.ReactElement;
  content: React.ReactElement;

  onContextMenuOpen?: ContextMenuEventFunc;
  onContextMenuClose?: ContextMenuEventFunc;
}

const ContextMenu: React.FunctionComponent<IContectMenuProps> = props => {
  const { target, content, onContextMenuOpen, onContextMenuClose, ...rest } = props;

  const onContextMenu = React.useCallback(
    (event: ContextMenuEvent) => {
      if (onContextMenuOpen) {
        onContextMenuOpen(event);
      }

      BPContextMenu.show(content, { left: event.clientX, top: event.clientY }, () => {
        // CALLBACK FOR WHEN THE MENU CLOSES
        if (onContextMenuClose) {
          onContextMenuClose(event);
        }
      });
    },
    [content]
  );

  return (
    <div {...rest} onContextMenu={onContextMenu}>
      {target}
    </div>
  );
};

/**
 * EXPORTS
 */

export { ContextMenu, IContectMenuProps };
