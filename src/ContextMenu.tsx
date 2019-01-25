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
import { Fragment, FunctionComponent, HTMLAttributes, MouseEvent, ReactNode, TouchEvent } from 'react';

import { Box, Break, Flex, IBox, useTheme } from './';

// TODO: allow custom renderMenu
// TODO: allow custom renderMenuItem?
// TODO: add icon support to menu items
// TODO: Context Menu should probably leverage/use MENU

/**
 * CONTEXT MENU
 */

interface IContextMenuProps {
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

export interface IContextMenu extends IContextMenuProps, IContextMenuViewProps {}

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

interface IContextMenuViewProps {
  id: string;
  className?: string;

  menuItems?: IContextMenuItem[];
  hideOnLeave?: boolean;
  onHide?: (event: any) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onShow?: (event: any) => void;
}

export interface IContextMenuView extends IContextMenuViewProps {}

export const ContextMenuView: FunctionComponent<IContextMenuView> = props => {
  const { menuItems = [], ...rest } = props;

  return (
    <Box {...rest} as={ReactContextMenu} css={menuStyles()}>
      {menuItems.map((item, index) => {
        return <ContextMenuItem key={index} {...item} />;
      })}
    </Box>
  );
};

const menuStyles = () => {
  const theme = useTheme();

  return [
    {
      zIndex: 10000,
      borderRadius: '5px',
      border: `1px solid ${theme.contextMenu.border}`,
      color: theme.contextMenu.fg,
      backgroundColor: theme.contextMenu.bg,
      minWidth: '180px',

      cursor: 'default',
      ':focus': {
        outline: '0 none',
      },

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

interface IContextMenuItemProps {
  title?: string;
  key?: number | string;
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
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export interface IContextMenuItem extends IContextMenuItemProps, Omit<IBox, 'onClick'> {}

export const ContextMenuItem: FunctionComponent<IContextMenuItem> = props => {
  const { attributes, data, title, divider, disabled, preventClose, onClick, menuItems = [], ...rest } = props;
  const css = contextMenuItemStyles({
    onClick,
    divider,
    disabled,
  });

  const isSubMenu = menuItems.length > 0;

  const menuItem = (
    <Box
      {...rest}
      css={css}
      as={(asProps: object) => (
        <ReactMenuItem
          attributes={{
            ...attributes,
            ...asProps,
          }}
          data={data}
          preventClose={preventClose}
          disabled={disabled}
          onClick={onClick}
        >
          <Flex alignItems="center">
            {title ? <Box flex={1}>{title}</Box> : null}
            {isSubMenu ? <Box pl="5px">&#9658;</Box> : null}
          </Flex>

          {divider ? <Break thickness={1} /> : null}
        </ReactMenuItem>
      )}
    />
  );

  if (isSubMenu) {
    return (
      <Box
        {...rest}
        css={menuStyles()}
        as={({ className }: { className: string }) => {
          return (
            // @ts-ignore
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

export const contextMenuItemStyles = ({ onClick, divider, disabled }: IContextMenuItemProps) => {
  const theme = useTheme();

  return [
    {
      padding: '6px 10px', // @md @lg'
      ':hover': {
        background: theme.contextMenu.hoverBg,
        color: theme.contextMenu.hoverFg,
      },
      ':focus': {
        outline: '0 none',
      },
    },
    onClick && {
      cursor: 'pointer',
    },
    divider && {
      ':hover': {
        background: 'inherit',
        color: 'inherit',
      },
    },
    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',

      ':hover': {
        background: 'inherit',
        color: 'inherit',
      },
    },
  ];
};
