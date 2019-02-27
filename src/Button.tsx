import * as React from 'react';

import { Box, IBox, IBoxCSS } from './Box';
import { ITheme, useTheme } from './theme';

// TODO better active styling

export interface IButton extends IBox<HTMLButtonElement> {
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButton>((props, ref) => {
  const { as = 'button', css, ...rest } = props;

  const { button } = useTheme();

  return <Box {...rest} as={as} ref={ref} css={[buttonStyles(button, props), css]} />;
});

export const buttonStyles = (theme: ITheme['button'], { disabled }: IButton = {}): IBoxCSS => {
  return [
    {
      color: theme.fg,
      backgroundColor: theme.bg,
      borderColor: theme.border,

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
        backgroundColor: theme.hoverBg,
      },

      ':active': {
        borderStyle: 'solid',
      },
    },

    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',

      ':hover': {
        backgroundColor: theme.bg,
      },
    },
  ];
};
