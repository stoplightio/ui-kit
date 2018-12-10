/* @jsx jsx */

import { css, jsx } from '@emotion/core';
import { FunctionComponent, ReactNode } from 'react';

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
  props: IMenu,
  menuItems: IMenuItem[],
  renderMenuItem: RenderMenuItemFunc
) => ReactNode;

const defaultRenderMenuItem: RenderMenuItemFunc = (item: IMenuItemProps, index: number) =>
  jsx(MenuItem, { key: index, ...item });

const defaultRenderMenu: RenderMenuFunc = ({ renderTrigger, ...rest }, menuItems, renderMenuItem) => {
  const theme = useTheme();

  return jsx(
    Flex,
    {
      flexDirection: 'column',
      color: theme.menu.fg,
      backgroundColor: theme.menu.bg,
      border: `1px solid ${theme.menu.border}`,
      radius: 'md',
      zIndex: 10000,
      ...rest,
      position: renderTrigger ? 'absolute' : 'relative',
    },
    menuItems.map(renderMenuItem)
  );
};

export const Menu: FunctionComponent<IMenu> = props => {
  const {
    menuItems,
    renderTrigger,
    renderMenuItem = defaultRenderMenuItem,
    renderMenu = defaultRenderMenu,
    ...rest
  } = props;

  const styles = menuStyles();

  return jsx(
    Flex,
    {
      flexDirection: 'column',
      css: styles,
      ...rest,
    },
    [renderTrigger && <Box as="span">{renderTrigger()}</Box>, renderMenu(props, menuItems, renderMenuItem)]
  );
};

export interface IMenuProps {
  menuItems: IMenuItemProps[];
  renderTrigger?: () => ReactNode;
  renderMenuItem?: RenderMenuItemFunc;
  renderMenu?: RenderMenuFunc;
}

export interface IMenu extends IMenuProps, IFlex {}

export const menuStyles = () => {
  return [
    {
      position: 'relative',
    },
    css`
      &:hover > * {
        display: flex !important;
      }

      > *:first-of-type + * {
        display: none;
      }
    `,
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
        <Icon
          icon={icon}
          pr={title || subtitle ? 10 : 0} // todo: replace with @xl
        />
      ),
      (title || subtitle) && (
        <span>
          {title && <Box>{title}</Box>}
          {subtitle && <Box>{subtitle}</Box>}
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
