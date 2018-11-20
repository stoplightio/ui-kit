import * as React from 'react';

import { Box, IBoxProps } from './Box';
import { Flex } from './Flex';
import { Icon, IIcon } from './Icon';

// TODO allow dividers in the menu
// TODO allow custom renderMenu
// TODO allow custom renderMenuItem
// TODO allow custom renderTrigger to make this a popup type component

/**
 * MENU
 */
export interface IMenuProps {
  menuItems: IMenuItemProps[];

  attributes?: IBoxProps;
}

export const Menu = (props: IMenuProps) => {
  const { menuItems = [], attributes = {} } = props;

  return (
    <Box
      fg="@menu.fg"
      bg="@menu.bg"
      borderColor="@menu.border"
      border="@xs"
      radius="@md"
      display="inline-block"
      {...attributes}
    >
      {menuItems.map((item: IMenuItemProps, index: number) => (
        <MenuItem key={index} {...item} />
      ))}
    </Box>
  );
};

/**
 * MENU ITEM
 */

export interface IMenuItemProps {
  className?: string;
  children?: any;

  title?: any;
  subtitle?: any;
  icon?: IIcon;
  disabled?: boolean;

  onClick?: (event: React.MouseEvent) => any;
  attributes?: IBoxProps;
}

export const MenuItem = (props: IMenuItemProps) => {
  const { icon, title, subtitle, disabled, onClick, attributes = {} } = props;

  return (
    <Flex
      items="center"
      px="@lg"
      py="@md"
      text="@md"
      cursor={disabled ? 'not-allowed' : onClick ? 'pointer' : 'default'}
      opacity={disabled && 0.6}
      onClick={onClick}
      {...attributes}
    >
      {icon && <Icon icon={icon} pr={(title || subtitle) && '@xl'} />}

      {(title || subtitle) && (
        <span>
          {title && <Box>{title}</Box>}
          {subtitle && <Box text="@sm">{subtitle}</Box>}
        </span>
      )}
    </Flex>
  );
};
