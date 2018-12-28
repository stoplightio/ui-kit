/* @jsx jsx */

import { jsx } from '@emotion/core';
import {
  ContextMenu as ReactContextMenu,
  ContextMenuTrigger as ReactContextMenuTrigger,
  MenuItem as ReactMenuItem,
} from 'react-contextmenu';

import { Omit } from '@stoplight/types';
import { Fragment, FunctionComponent, HTMLAttributes, MouseEvent, ReactNode, TouchEvent } from 'react';

import { Box, Break, IBox, Text, useTheme } from './';

// TODO: expose SubMenu component
// TODO: allow custom renderMenu
// TODO: allow custom renderMenuItem?
// TODO: add icon support to menu items
// TODO: Context Menu should probably leverage/use MENU

/**
 * CONTEXT MENU
 */

interface IContextMenuProps {
  renderTrigger?: (props?: IContextMenuProps) => ReactNode | string;
}

export interface IContextMenu extends IContextMenuProps, IContextMenuViewProps {}

export const ContextMenu: FunctionComponent<IContextMenu> = props => {
  const { id, renderTrigger, ...rest } = props;

  return (
    <Fragment>
      {renderTrigger && <ReactContextMenuTrigger id={id}>{renderTrigger()}</ReactContextMenuTrigger>}

      <ContextMenuView id={id} {...rest} />
    </Fragment>
  );
};

export { ReactContextMenuTrigger as ContextMenuTrigger };

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
  const css = menuStyles();

  return (
    <Box {...rest} as={ReactContextMenu} css={css}>
      {menuItems.map((item, index) => (
        <ContextMenuItem key={item.key || index} {...item} />
      ))}
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
}

export interface IContextMenuItem extends IContextMenuItemProps, Omit<IBox, 'onClick'> {}

export const ContextMenuItem: FunctionComponent<IContextMenuItem> = props => {
  const { attributes, data, title, divider, disabled, preventClose, onClick, ...rest } = props;
  const css = contextMenuItemStyles({
    onClick,
    divider,
    disabled,
  });

  return (
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
          {title && <Text>{title}</Text>}
          {divider && <Break thickness={1} />}
        </ReactMenuItem>
      )}
    />
  );
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
