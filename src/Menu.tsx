import {
  IMenuDividerProps as BPMenuDividerProps,
  IMenuItemProps as BPMenuItemProps,
  IMenuProps as BPMenuProps,
  Menu as BPMenu,
  MenuDivider as BPMenuDivider,
  MenuItem as BPMenuItem,
} from '@blueprintjs/core';
import * as React from 'react';

/**
 * MENU CONTAINER
 */
interface IMenuProps extends BPMenuProps {}
const Menu: React.FunctionComponent<IMenuProps> = props => {
  return <BPMenu {...props} />;
};

export { IMenuProps, Menu };

/**
 * MENU ITEM
 */

interface IMenuItemProps extends BPMenuItemProps {}
const MenuItem: React.FunctionComponent<IMenuItemProps> = props => {
  return <BPMenuItem {...props} />;
};

export { IMenuItemProps, MenuItem };

/**
 * MENU DIVIDER
 */

interface IMenuDividerProps extends BPMenuDividerProps {}
const MenuDivider: React.FunctionComponent<IMenuDividerProps> = props => {
  return <BPMenuDivider {...props} />;
};

export { IMenuDividerProps, MenuDivider };
