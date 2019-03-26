import * as React from 'react';
import {
  ContextMenu as ReactContextMenu,
  ContextMenuTrigger,
  MenuItem as ReactMenuItem,
  SubMenu as ReactSubMenu,
} from 'react-contextmenu';

import { Omit } from '@stoplight/types';

import { Box, Break, Flex, IBox, ITheme, useTheme } from './';

// TODO: allow custom renderMenu
// TODO: allow custom renderMenuItem?
// TODO: add icon support to menu items
// TODO: Context Menu should probably leverage/use MENU

/**
 * CONTEXT MENU
 */

export interface IContextMenu extends IContextMenuView {
  renderTrigger: (
    ref: React.MutableRefObject<{
      handleContextClick: (e: React.MouseEvent<HTMLDivElement>) => void;
      // TODO get event type
      handleContextMenu: (e: any) => void;
      handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
      handleMouseOut: (e: React.MouseEvent<HTMLDivElement>) => void;
      handleMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
      handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
      handleTouchstart: (e: React.TouchEvent<HTMLDivElement>) => void;
    }>
  ) => React.ReactNode | string;
}

const ContextMenu: React.FunctionComponent<IContextMenu> = props => {
  const { id, renderTrigger, ...rest } = props;

  const contextTriggerRef = React.useRef<any>(null);

  return (
    <React.Fragment>
      <ContextMenuTrigger id={id} ref={contextTriggerRef} holdToDisplay={-1}>
        {renderTrigger(contextTriggerRef)}
      </ContextMenuTrigger>
      <ContextMenuView id={id} {...rest} />
    </React.Fragment>
  );
};

export { ContextMenuTrigger };

/**
 * MENU
 */

export interface IContextMenuView {
  id: string;
  className?: string;

  menuItems?: IContextMenuItem[];
  hideOnLeave?: boolean;
  onHide?: (event: any) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onShow?: (event: any) => void;
}

const ContextMenuView: React.FunctionComponent<IContextMenuView> = props => {
  const { menuItems = [], ...viewProps } = props;

  const { contextMenu: theme } = useTheme();

  return (
    <Box {...viewProps} as={ReactContextMenu} css={menuStyles(theme, menuItems.length > 0)}>
      {menuItems.map((item, index) => {
        return <ContextMenuItem key={index} {...item} />;
      })}
    </Box>
  );
};

const menuStyles = (theme: ITheme['contextMenu'], hasMenuItems: boolean) => {
  // Only show context menu if we have items to show
  if (!hasMenuItems) {
    return [{ display: 'none' }];
  }

  return [
    {
      color: theme.fg,
      backgroundColor: theme.bg,
      border: theme.border ? `1px solid ${theme.border}` : 'none',

      zIndex: 10000,
      borderRadius: '3px',
      minWidth: '180px',
      maxWidth: '280px',

      ':focus': {
        outline: '0 none',
      },

      // so submenus only appear when hovering over the correct item
      '.react-contextmenu-submenu': {
        '.react-contextmenu': { display: 'none' },
        '.react-contextmenu--visible': { display: 'block' },
      },
    },
  ];
};

/**
 * MENUITEM
 */

type ContextMenuTitle = { title?: string; shortcut?: never } | { title: string; shortcut?: string };

export type IContextMenuItem = ContextMenuTitle &
  Omit<IBox, 'onClick'> & {
    data?: Object;
    divider?: boolean;
    disabled?: boolean;
    preventClose?: boolean;
    onClick?: (
      event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
      data: Object,
      target: HTMLElement
    ) => void | Function;
    menuItems?: IContextMenuItem[];
  };

const ContextMenuItem: React.FunctionComponent<IContextMenuItem> = props => {
  const {
    attributes,
    data,
    title,
    shortcut,
    divider,
    disabled,
    preventClose,
    onClick,
    menuItems = [],
    ...rest
  } = props;
  const { contextMenu: theme } = useTheme();

  const isSubMenu = menuItems.length > 0;

  const menuItem = (
    <Box
      {...rest}
      css={contextMenuItemStyles(theme, { onClick, divider, disabled })}
      as={(asProps: object) => (
        <ReactMenuItem
          attributes={asProps}
          data={data}
          preventClose={preventClose}
          disabled={disabled}
          onClick={onClick}
        >
          <Flex alignItems="center" justifyContent="space-around">
            {title ? <Box flex={1}>{title}</Box> : null}
            {shortcut ? (
              <Box opacity={0.5} fontSize="0.8rem">
                {shortcut}
              </Box>
            ) : null}
            {isSubMenu ? (
              <Box pl="6px" fontSize="10px">
                &#9658;
              </Box>
            ) : null}
          </Flex>

          {divider ? <Break thickness={1} m="5px" color={theme.border} /> : null}
        </ReactMenuItem>
      )}
    />
  );

  if (isSubMenu) {
    return (
      <Box
        {...rest}
        css={menuStyles(theme, true)}
        as={({ className }: { className: string }) => {
          return (
            <ReactSubMenu
              title={menuItem}
              className={className} // className on the resulting submenu Menu
            >
              {menuItems.map((item, index) => {
                return <ContextMenuItem key={index} {...item} />;
              })}
            </ReactSubMenu>
          );
        }}
      />
    );
  }

  return menuItem;
};

export const contextMenuItemStyles = (
  theme: ITheme['contextMenu'],
  { onClick, divider, disabled }: IContextMenuItem
) => {
  return [
    {
      padding: '10px 14px',
      fontSize: '14px',
      borderRadius: '2px',

      ':hover': {
        background: theme.hoverBg,
      },
      ':focus': {
        outline: '0 none',
      },
    },
    onClick && {
      cursor: 'pointer',
    },
    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    (divider || disabled) && {
      ':hover': {
        background: 'inherit',
        color: 'inherit',
      },
    },
  ];
};

export { ContextMenu, ContextMenuView, ContextMenuItem };
