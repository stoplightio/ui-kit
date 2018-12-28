/* @jsx jsx */

import { jsx } from '@emotion/core';
import {
  ContextMenu as ReactContextMenu,
  ContextMenuTrigger as ReactContextMenuTrigger,
  MenuItem as ReactMenuItem,
} from 'react-contextmenu';

import { Omit } from '@stoplight/types';
import { Fragment, FunctionComponent, HTMLAttributes, MouseEvent, TouchEvent } from 'react';

import { Box, Break, IBox, Text, useTheme } from './';

// TODO: expose SubMenu component
// TODO: allow custom renderMenu
// TODO: allow custom renderMenuItem?
// TODO: add icon support to menu items
// TODO: Context Menu should probably leverage/use MENU

/**
 * CONTEXT MENU
 */

export interface IContextMenuProps {
  renderTrigger: (props?: IContextMenuProps) => JSX.Element | string;
}

export interface IContextMenu extends IContextMenuProps, IMenuProps {}

export const ContextMenu = (props: IContextMenu) => {
  const { id, renderTrigger, ...rest } = props;

  return (
    <Fragment>
      <ReactContextMenuTrigger id={id}>{renderTrigger && renderTrigger()}</ReactContextMenuTrigger>

      <ContextMenuView id={id} {...rest} />
    </Fragment>
  );
};

export { ReactContextMenuTrigger as ContextMenuTrigger };

/**
 * MENU
 */

interface IMenuProps {
  id: string;
  className?: string;

  menuItems?: IMenuItem[];
  hideOnLeave?: boolean;
  onHide?: (event: any) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onShow?: (event: any) => void;
}

export const ContextMenuView = (props: IMenuProps) => {
  const { menuItems = [], ...rest } = props;
  const css = menuStyles();

  return (
    <Box {...rest} as={ReactContextMenu} css={css}>
      {menuItems.map((item: IMenuItemProps) => (
        <ContextMenuItem {...item} />
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

interface IMenuItemProps {
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

interface IMenuItem extends IMenuItemProps, Omit<IBox, 'onClick'> {}

export const ContextMenuItem: FunctionComponent<IMenuItem> = props => {
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

export const contextMenuItemStyles = ({ onClick, divider, disabled }: IMenuItemProps) => {
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
