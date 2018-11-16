import * as React from 'react';

import noop = require('lodash/noop');
import { Icon, IIcon } from './Icon';
import { List } from './List';
import { styled } from './utils';

export interface IMenuProps {
  className?: string;
  children: any;
  padding?: string;
}

export interface IMenuItemProps {
  className?: string;
  children?: any;
  icon?: IIcon;
  text?: any;
  padding?: string;
  subText?: any;
  onClick?: (event: React.MouseEvent) => any;
}

export const Menu = styled<IMenuProps>(({ className, children }: IMenuProps) => {
  return (
    <List className={className} itemType="none">
      {children}
    </List>
  );
})`
  padding: ${({ padding }: IMenuItemProps) => (padding ? padding : '0')};
`;

export const MenuItem = styled<IMenuItemProps>((props: IMenuItemProps) => {
  const { className, icon, subText, text, onClick = noop } = props;

  return (
    <li className={className} onClick={onClick}>
      {icon && <Icon icon={icon} pr="xl" />}
      {text && (
        <span>
          {text}
          {subText}
        </span>
      )}
    </li>
  );
})`
  align-items: center;
  display: flex;
  cursor: pointer;
  padding: ${({ padding }: IMenuItemProps) => (padding ? padding : '0.75rem 0')}
  font-size: 14px;
`;
