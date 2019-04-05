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
 * MENU
 */
interface IMenuProps extends BPMenuProps {}

const Menu: React.FunctionComponent<IMenuProps> = props => {
  return <BPMenu {...props} />;
};

/**
 * MENU ITEM
 */

interface IMenuItemProps extends BPMenuItemProps {}

const MenuItem: React.FunctionComponent<IMenuItemProps> = props => {
  return <BPMenuItem {...props} />;
};

/**
 * MENU DIVIDER
 */

interface IMenuDividerProps extends BPMenuDividerProps {}

const MenuDivider: React.FunctionComponent<IMenuDividerProps> = props => {
  return <BPMenuDivider {...props} />;
};

/**
 * EXPORTS
 */
export { IMenuDividerProps, IMenuItemProps, IMenuProps, MenuDivider, MenuItem, Menu };
