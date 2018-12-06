/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export const Button: FunctionComponent<IButton> = props => {
  const { as = 'button', disabled, ...rest } = props;

  const css = [...buttonStyles({ disabled })];

  return jsx(Box, {
    ...rest,
    as,
    css,
  });
};

export interface IButton extends IButtonProps, IBox<HTMLButtonElement> {}

export interface IButtonProps {
  disabled?: boolean;
}

export const buttonStyles = ({ disabled }: IButtonProps = {}) => {
  const theme = useTheme();

  return [
    {
      appearance: 'none',
      cursor: 'pointer',
      opacity: 0.85,

      backgroundColor: theme.button.bg,
      color: theme.button.fg,

      ':focus': {
        outline: 'none',
      },

      ':hover': {
        opacity: 0.75,
        backgroundColor: theme.button.hoverBg,
      },

      ':active': {
        opacity: 1,
      },
    },

    disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,

      ':hover': {
        opacity: 0.6,
      },
    },
  ];
};
