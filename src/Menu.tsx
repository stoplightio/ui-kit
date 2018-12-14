/* @jsx jsx */

import { jsx } from '@emotion/core';

import { FunctionComponent, ReactNode, useState } from 'react';

import { Box } from './Box';
import { Flex, IFlex } from './Flex';
import { Icon, IIcon } from './Icon';
import { useTheme } from './theme';

// TODO allow dividers in the menu

/**
 * MENU
 */

export declare type RenderMenuItemFunc = (item: IMenuItem, index: number, items: IMenuItem[]) => ReactNode;
export declare type RenderMenuFunc = (
  css: IFlex['css'],
  menuItems: IMenuItem[],
  renderMenuItem: RenderMenuItemFunc
) => ReactNode;

const defaultRenderMenuItem: RenderMenuItemFunc = (item: IMenuItemProps, index: number) =>
  jsx(MenuItem, { key: index, ...item });

const defaultRenderMenu: RenderMenuFunc = (styles, menuItems, renderMenuItem) => {
  return jsx(
    Flex,
    {
      css: styles,
      key: 'menu-items',
    },
    menuItems.map(renderMenuItem)
  );
};

export const menuListStyles = ({ hasTrigger, posX, posY, offset }: Partial<IMenu> & { hasTrigger: boolean }) => {
  const theme = useTheme();

  return [
    {
      flexDirection: 'column',
      color: theme.menu.fg,
      backgroundColor: theme.menu.bg,
      border: `1px solid ${theme.menu.border}`,
      borderRadius: '4px',
      zIndex: 10000,
      position: hasTrigger ? 'absolute' : 'relative',
      margin: offset && `${offset.y || 0}px ${offset.x || 0}px`,
    },
    posY === 'bottom' ? { top: '100%' } : { bottom: '100%' },
    posX === 'center' && {
      left: '50%',
      transform: 'translateX(-50%)',
    },
    posX === 'left' && { right: '100%' },
    posX === 'right' && { left: '100%' },
  ];
};

export const Menu: FunctionComponent<IMenu> = props => {
  const {
    menuItems,
    posX = 'center',
    posY = 'bottom',
    offset,
    renderTrigger,
    renderMenuItem = defaultRenderMenuItem,
    renderMenu = defaultRenderMenu,
    key,
    ...rest
  } = props;

  const [isShown, setShow] = useState<boolean>(false);
  let timer: null | NodeJS.Timer | number = null;

  const styles = menuStyles();
  const listStyles = menuListStyles({
    posX,
    posY,
    offset,
    hasTrigger: !!renderTrigger,
  });

  return jsx(
    Box,
    {
      key,
      css: styles,
      onMouseEnter() {
        clearTimeout(timer as number);
        timer = null;
        setShow(true);
      },
      onMouseLeave() {
        timer = setTimeout(setShow, 200, false);
      },
      ...rest,
    },
    [
      renderTrigger && renderTrigger(isShown),
      (!renderTrigger || isShown) && renderMenu(listStyles, menuItems, renderMenuItem),
    ]
  );
};

export interface IMenuProps {
  menuItems: IMenuItemProps[];
  renderTrigger?: (isShown: boolean) => ReactNode;
  renderMenuItem?: RenderMenuItemFunc;
  posY?: 'top' | 'bottom';
  posX?: 'left' | 'right' | 'center';
  offset?: {
    x?: number;
    y?: number;
  };
}

export interface IMenu extends IMenuProps, IFlex {}

export const menuStyles = () => {
  return [
    {
      display: 'inline-flex',
      position: 'relative',
      width: 'auto',
      overflow: 'visible',
      whiteSpace: 'nowrap',
    },
  ];
};
/**
 * MENU ITEM
 */
export const MenuItem: FunctionComponent<IMenuItem> = props => {
  const { icon, title, subtitle, onClick, disabled, ...rest } = props;

  const styles = menuItemStyles({ disabled, onClick });

  return jsx(
    Flex,
    {
      ...rest,
      onClick,
      css: styles,
    },
    [
      icon && (
        <Flex key="menu-icon" alignItems="center" justifyContent="center" width="20px" pr={title || subtitle ? 10 : 0}>
          <Icon icon={icon} />
        </Flex>
      ),
      (title || subtitle) && (
        <span key="menu-title">
          {title && <span>{title}</span>}
          {subtitle && <span>{subtitle}</span>}
        </span>
      ),
    ]
  );
};

export interface IMenuItemProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: IIcon['icon'];
  disabled?: boolean;
  onClick?: IFlex['onClick'];
}

export interface IMenuItem extends IMenuItemProps, Pick<IFlex, Exclude<keyof IFlex, 'title'>> {}

const menuItemStyles = ({ disabled, onClick }: Partial<IMenuItemProps>) => {
  const theme = useTheme();

  return [
    {
      alignItems: 'center',
      padding: '6px 10px', // @md @lg'
      cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
      opacity: disabled && 0.6,

      ':hover': {
        backgroundColor: theme.menu.hoverBg,
        color: theme.menu.hoverFg,
      },
    },
  ];
};
