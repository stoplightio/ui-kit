import * as React from 'react';
import { ContextMenu as ReactContextMenu, MenuItem as ReactMenuItem } from 'react-contextmenu';

import { Box, IBoxProps } from './Box';
import { ITextProps, Text } from './Text';
import { styled } from './utils';

// TODO: expose SubMenu component

interface IContextMenuProps extends IBoxProps {
  id: string;
  data?: any;
  hideOnLeave?: boolean;
  onHide?: (event: any) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>, data: Object, target: HTMLElement) => void;
  onShow?: (event: any) => void;
}

interface IMenuItemProps extends ITextProps {
  attributes?: React.HTMLAttributes<HTMLDivElement>;
  data?: Object;
  disabled?: boolean;
  divider?: boolean;
  preventClose?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>, data: Object, target: HTMLElement) => void;
}

export const ContextMenu = styled<IContextMenuProps, 'div'>(Box as any).attrs({
  as: () => ReactContextMenu,
  cursor: 'default',
  css: {
    ':focus': {
      outline: '0 none',
    },
  },
})``;

ContextMenu.defaultProps = {
  bg: 'contextMenu.bg',
  radius: 'md',
  border: 'xs',
  borderColor: 'contextMenu.borderColor',
};

export const MenuItem = styled<IMenuItemProps, 'div'>(Text as any).attrs({
  as: () => ({ className, ...rest }: IMenuItemProps) => (
    <ReactMenuItem
      attributes={{
        className,
      }}
      {...rest}
    />
  ),
  css: {
    ':hover': {
      background: 'dodgerblue',
      color: 'white',
    },
    ':focus': {
      outline: '0 none',
    },
  },
  borderBottom: ({ divider }: IMenuItemProps) => (divider ? 'xs' : 'none'),
  borderColor: ({ divider, borderColor }: IMenuItemProps) => (divider && borderColor) || 'contextMenu.borderColor',
})(
  // @ts-ignore
  ({ divider }: IMenuItemProps) =>
    divider && {
      height: 0,
      margin: '3px 0',
      padding: 0,
    },
  ({ disabled }: IMenuItemProps) =>
    disabled && {
      opacity: 0.6,

      ':hover': {
        background: 'inherit',
        color: 'inherit',
      },
    }
);

MenuItem.defaultProps = {
  px: 'lg',
  py: 'md',
};

export { ContextMenuTrigger } from 'react-contextmenu';
