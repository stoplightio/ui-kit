/* @jsx jsx */

import { jsx } from '@emotion/core';
import {
  ContextMenu as ReactContextMenu,
  ContextMenuTrigger,
  MenuItem as ReactMenuItem,
  SubMenu as ReactSubMenu,
} from 'react-contextmenu';

import { Omit } from '@stoplight/types';
import { Fragment, FunctionComponent, HTMLAttributes, MouseEvent, ReactNode, TouchEvent } from 'react';

import { Box, Break, Flex, IBox, Text, useTheme } from './';

// TODO: allow custom renderMenu
// TODO: allow custom renderMenuItem?
// TODO: add icon support to menu items
// TODO: Context Menu should probably leverage/use MENU

/**
 * CONTEXT MENU
 */

interface IContextMenuProps {
  renderTrigger: (props?: IContextMenuProps) => ReactNode | string;
}

export interface IContextMenu extends IContextMenuProps, IContextMenuViewProps {}

export const ContextMenu: FunctionComponent<IContextMenu> = props => {
  const { id, renderTrigger, ...rest } = props;

  if (typeof renderTrigger !== 'function') return null;

  return (
    <Fragment>
      <ContextMenuTrigger id={id}>{renderTrigger()}</ContextMenuTrigger>
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

      cursor: 'default',
      ':focus': {
        outline: '0 none',
      },

      '.react-contextmenu-submenu': {
        '.react-contextmenu': { opacity: 0, display: 'none' },
        '.react-contextmenu--visible': { opacity: 1, display: 'block' },
      },
    },
  ];
};

/**
 * MENUITEM
 */

interface IContextMenuItemProps {
  attributes?: HTMLAttributes<HTMLDivElement>;
  data?: Object;
  title?: string;
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

export interface IContextMenuItem extends IContextMenuItemProps, Omit<IBox, 'onClick'> {}

export const ContextMenuItem: FunctionComponent<IContextMenuItem> = props => {
  const { attributes, data, title, divider, disabled, preventClose, onClick, menuItems = [], ...rest } = props;
  const css = contextMenuItemStyles({
    onClick,
    divider,
    disabled,
  });

  const isSubMenu = menuItems && menuItems.length;

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
          onClick={(e, d, t) => {
            if (onClick) {
              return onClick(e, d, t);
            }
          }}
        >
          <Flex alignItems="center">
            {title ? <Text flex={1}>{title}</Text> : null}
            {isSubMenu ? <Text pl="5px">&#9658;</Text> : null}
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
              className={className} // className on the resulting menu Menu
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
