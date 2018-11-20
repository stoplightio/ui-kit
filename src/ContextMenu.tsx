import * as React from 'react';
import {
  ContextMenu as ReactContextMenu,
  ContextMenuTrigger as ReactContextMenuTrigger,
  MenuItem as ReactMenuItem,
} from 'react-contextmenu';

import { Box, IBoxProps } from './Box';
import { Break } from './Break';
import { ITextProps, Text } from './Text';
import { styled } from './utils';

// TODO: expose SubMenu component

/**
 * CONTEXT MENU
 */

interface IContextMenuProps extends IMenuProps {
  id: string;

  renderTrigger: (props?: IContextMenuProps) => JSX.Element | string;
}

export const ContextMenu = (props: IContextMenuProps) => {
  const { id, menuItems = [], renderTrigger, onMouseLeave, hideOnLeave, onHide, onShow } = props;

  return (
    <React.Fragment>
      <ReactContextMenuTrigger id={id}>{renderTrigger && renderTrigger()}</ReactContextMenuTrigger>

      <Menu
        id={id}
        menuItems={menuItems}
        onHide={onHide}
        onShow={onShow}
        onMouseLeave={onMouseLeave}
        hideOnLeave={hideOnLeave}
      />
    </React.Fragment>
  );
};

/**
 * MENU
 */

interface IMenuProps extends IBoxProps {
  id: string;
  className?: string;

  menuItems?: IMenuItemProps[];
  hideOnLeave?: boolean;
  onHide?: (event: any) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onShow?: (event: any) => void;
}

const Menu = styled<IMenuProps, 'div'>(Box as any).attrs({
  as: () => (props: IMenuProps) => {
    const { menuItems = [], ...rest } = props;

    return (
      <ReactContextMenu {...rest}>
        {menuItems.map((item: IMenuItemProps) => {
          return <ContextMenuItem {...item} {...item.attributes} />;
        })}
      </ReactContextMenu>
    );
  },
  cursor: 'default',
  css: {
    ':focus': {
      outline: '0 none',
    },
  },
})``;

Menu.defaultProps = {
  radius: 'md',
  border: 'xs',
  fg: 'contextMenu.fg',
  bg: 'contextMenu.bg',
  borderColor: 'contextMenu.border',
};

/**
 * MENUITEM
 */

interface IMenuItemProps extends ITextProps {
  className?: string;
  data?: Object;
  title?: string;
  divider?: boolean;
  disabled?: boolean;
  preventClose?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>, data: Object, target: HTMLElement) => void;

  attributes?: ITextProps;
}

export const ContextMenuItem = styled<IMenuItemProps, 'div'>(Text as any).attrs({
  as: () => (props: IMenuItemProps) => {
    const { className, title, divider, disabled, onClick, preventClose } = props;

    return (
      <ReactMenuItem
        attributes={{
          className,
        }}
        preventClose={preventClose}
        disabled={disabled}
        onClick={onClick}
      >
        {title && <Text>{title}</Text>}
        {divider && <Break thickness={0} />}
      </ReactMenuItem>
    );
  },
  px: 'lg',
  py: 'md',
  css: {
    ':hover': {
      background: 'dodgerblue',
      color: 'white',
    },
    ':focus': {
      outline: '0 none',
    },
  },
})(
  // @ts-ignore
  ({ onClick }: IMenuItemProps) =>
    onClick && {
      cursor: 'pointer',
    },
  // @ts-ignore
  ({ divider }: IMenuItemProps) =>
    divider && {
      ':hover': {
        background: 'inherit',
        color: 'inherit',
      },
    },
  // @ts-ignore
  ({ disabled }: IMenuItemProps) =>
    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',

      ':hover': {
        background: 'inherit',
        color: 'inherit',
      },
    }
);
