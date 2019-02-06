/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import {
  ContextMenu as ReactContextMenu,
  ContextMenuTrigger,
  MenuItem as ReactMenuItem,
  SubMenu as ReactSubMenu,
} from 'react-contextmenu';

import { Omit } from '@stoplight/types';
import { Fragment, FunctionComponent, MouseEvent, ReactNode, TouchEvent } from 'react';

import { Box, Break, Flex, IBox, useTheme } from './';

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
      handleContextClick: (e: MouseEvent<HTMLDivElement>) => void;
      // TODO get event type
      handleContextMenu: (e: any) => void;
      handleMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
      handleMouseOut: (e: MouseEvent<HTMLDivElement>) => void;
      handleMouseUp: (e: MouseEvent<HTMLDivElement>) => void;
      handleTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
      handleTouchstart: (e: TouchEvent<HTMLDivElement>) => void;
    }>
  ) => ReactNode | string;
}

export const ContextMenu: FunctionComponent<IContextMenu> = props => {
  const { id, renderTrigger, ...rest } = props;

  const contextTriggerRef = React.useRef<any>(null);

  return (
    <Fragment>
      <ContextMenuTrigger id={id} ref={contextTriggerRef} holdToDisplay={-1}>
        {renderTrigger(contextTriggerRef)}
      </ContextMenuTrigger>
      <ContextMenuView id={id} {...rest} />
    </Fragment>
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
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onShow?: (event: any) => void;
}

export const ContextMenuView: FunctionComponent<IContextMenuView> = props => {
  const { menuItems = [], ...viewProps } = props;

  return (
    <Box {...viewProps} as={ReactContextMenu} defaultCSS={menuStyles()}>
      {menuItems.map((item, index) => {
        return <ContextMenuItem key={index} {...item} />;
      })}
    </Box>
  );
};

const menuStyles = () => {
  const { contextMenu } = useTheme();

  return [
    {
      color: contextMenu.fg,
      backgroundColor: contextMenu.bg,
      border: contextMenu.border ? `1px solid ${contextMenu.border}` : 'none',

      zIndex: 10000,
      padding: '5px 7px',
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

export interface IContextMenuItem extends Omit<IBox, 'onClick'> {
  title?: string;
  data?: Object;
  divider?: boolean;
  disabled?: boolean;
  preventClose?: boolean;
  onClick?: (
    event: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
    data: Object,
    target: HTMLElement
  ) => void | Function;
  menuItems?: IContextMenuItem[];
}

export const ContextMenuItem: FunctionComponent<IContextMenuItem> = props => {
  const { attributes, data, title, divider, disabled, preventClose, onClick, menuItems = [], ...rest } = props;
  const { contextMenu } = useTheme();

  const isSubMenu = menuItems.length > 0;

  const menuItem = (
    <Box
      {...rest}
      defaultCSS={contextMenuItemStyles({ onClick, divider, disabled })}
      as={(asProps: object) => (
        <ReactMenuItem
          attributes={asProps}
          data={data}
          preventClose={preventClose}
          disabled={disabled}
          onClick={onClick}
        >
          <Flex alignItems="center">
            {title ? <Box flex={1}>{title}</Box> : null}
            {isSubMenu ? (
              <Box pl="6px" fontSize="10px">
                &#9658;
              </Box>
            ) : null}
          </Flex>

          {divider ? <Break thickness={1} m="5px" color={contextMenu.border} /> : null}
        </ReactMenuItem>
      )}
    />
  );

  if (isSubMenu) {
    return (
      <Box
        {...rest}
        defaultCSS={menuStyles()}
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

export const contextMenuItemStyles = ({ onClick, divider, disabled }: IContextMenuItem) => {
  const { contextMenu } = useTheme();

  return [
    {
      padding: '5px 7px',
      fontSize: '14px',
      borderRadius: '2px',

      ':hover': {
        background: contextMenu.hoverBg,
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
