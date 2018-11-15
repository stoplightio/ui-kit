import * as React from 'react';
import { ContextMenu as ReactContextMenu, MenuItem as ReactMenuItem } from 'react-contextmenu';

import { Box, IBoxProps } from './Box';
import { ITextProps, Text } from './Text';
import { styled } from './utils';

export const ContextMenu = styled<IBoxProps, 'div'>(Box as any).attrs({
  as: () => ReactContextMenu,
  border: 'xs',
  bg: 'contextMenu.bg',
  borderColor: 'contextMenu.borderColor',
  radius: 'md',
  cursor: 'default',
  css: {
    ':focus': {
      outline: 'none',
    },
  },
})``;

const StyledMenuItem = ({ className, ...rest }: IBoxProps) => (
  <ReactMenuItem
    attributes={{
      className,
    }}
    {...rest}
  />
);

export const MenuItem = styled<ITextProps, 'div'>(Text as any).attrs({
  as: () => StyledMenuItem,
  px: 'lg',
  py: 'md',
  css: {
    ':hover': {
      background: 'dodgerblue',
      color: 'white',
    },
  },
  // @ts-ignore
  borderBottom: ({ divider }: any) => divider && '1px solid',
  borderColor: ({ divider }: any) => divider && 'contextMenu.borderColor',
})(
  {
    // @ts-ignore
    ':focus': {
      outline: 'none',
    },
  },
  // @ts-ignore
  ({ divider }: any) =>
    divider && {
      height: 0,
      margin: '3px 0',
      padding: 0,
    },
  ({ disabled }: any) =>
    disabled && {
      opacity: 0.6,

      ':hover': {
        background: 'inherit',
        color: 'inherit',
      },
    }
);

MenuItem.defaultProps = {
  as: 'div',
};

export { ContextMenuTrigger } from 'react-contextmenu';
