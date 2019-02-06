/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox, IBoxCSS } from './Box';
import { useTheme } from './theme';

// TODO better active styling

export interface IButton extends IBox<HTMLButtonElement> {
  disabled?: boolean;
}

export const Button: FunctionComponent<IButton> = props => {
  const { as = 'button', ...rest } = props;
  return <Box {...rest} as={as} defaultCSS={buttonStyles(props)} />;
};

export const buttonStyles = ({ disabled }: IButton = {}): IBoxCSS => {
  const { button } = useTheme();

  return [
    {
      color: button.fg,
      backgroundColor: button.bg,
      borderColor: button.border,

      padding: '5px 10px',
      minHeight: '30px',
      minWidth: '30px',

      borderRadius: '3px',

      appearance: 'none',
      cursor: 'pointer',

      ':focus': {
        outline: 'none',
      },

      ':hover': {
        backgroundColor: button.hoverBg,
      },

      ':active': {
        borderStyle: 'solid',
      },
    },

    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',

      ':hover': {
        backgroundColor: button.bg,
      },
    },
  ];
};
