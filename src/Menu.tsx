import * as React from 'react';

import noop = require('lodash/noop');
import { Box, IBoxProps } from './Box';
import { Icon, IIcon } from './Icon';
import { IListProps, List } from './List';
import { styled } from './utils';

export interface IMenuProps extends IListProps {
  children: any;
}

export interface IMenuItemProps extends IBoxProps {
  className?: string;
  children?: any;
  icon?: IIcon;
  title?: any;
  subTitle?: any;
  onClick?: (event: React.MouseEvent) => any;
}

export const Menu = styled<IMenuProps>(List as any).attrs({
  itemType: 'none',
  margin: '0',
})``;

const MenuItemView = (props: IMenuItemProps) => {
  const { className, icon, title, subTitle, onClick = noop } = props;

  return (
    <li className={className} onClick={onClick}>
      {icon && <Icon icon={icon} pr="xl" />}
      {title && (
        <span>
          {title}
          {subTitle}
        </span>
      )}
    </li>
  );
};

export const MenuItem = styled<IMenuItemProps, 'li'>(Box as any).attrs({
  as: () => MenuItemView,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  pt: 'md',
  pb: 'md',
  fontSize: 'sm',
})``;
