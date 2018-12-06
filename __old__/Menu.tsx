import * as React from 'react';

import { Box, IBoxProps } from './Box';
import { Flex, IFlexProps } from './Flex';
import { Icon, IIcon } from './Icon';
import { styled } from './utils';

// TODO allow dividers in the menu

export interface IMenuTriggerProps {
  children: any;
}

/**
 * MENU
 */
declare type RenderMenuItem = (item: IMenuItemProps, index: number, items: IMenuItemProps[]) => any;

export interface IMenuProps {
  menuItems: IMenuItemProps[];
  direction?: IFlexProps['direction'];
  attributes?: IFlexProps;
  onMouseEnter?: React.EventHandler<React.SyntheticEvent<HTMLDivElement>>;
  onMouseLeave?: React.EventHandler<React.SyntheticEvent<HTMLDivElement>>;
  renderTrigger?: () => any;
  renderMenuItem?: RenderMenuItem;
  renderMenu?: (
    props: IMenuProps & { className: string },
    menuItems: IMenuItemProps[],
    renderMenuItem: RenderMenuItem
  ) => any;
}

const MenuTrigger = styled<IMenuTriggerProps, any>(
  ({ children, className }: IMenuTriggerProps & { className: string }) => React.cloneElement(children, { className })
)``;

const MenuView = (props: IMenuProps & { className: string }) => {
  const {
    attributes = null,
    className,
    direction = 'column',
    onMouseEnter,
    onMouseLeave,
    menuItems = [],
    renderTrigger,
    renderMenuItem = (item: IMenuItemProps, index: number) => <MenuItem key={index} {...item} />,
    renderMenu = () => (
      <Flex
        fg="menu.fg"
        bg="menu.bg"
        borderColor="menu.border"
        border="xs"
        radius="md"
        direction={direction}
        position={renderTrigger ? 'absolute' : 'relative'}
        {...attributes}
      >
        {menuItems.map(renderMenuItem)}
      </Flex>
    ),
  } = props;

  return (
    <Flex className={className} direction={direction} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {renderTrigger && <MenuTrigger>{renderTrigger()}</MenuTrigger>}
      {renderMenu(props, menuItems, renderMenuItem)}
    </Flex>
  );
};

export const Menu = styled<IMenuProps, 'div'>(MenuView as any)`
  position: relative;

  &:hover > ${Flex} {
    display: flex !important;
  }

  ${MenuTrigger} + ${Flex} {
    display: none;
  }
`;

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
