import * as React from 'react';

import { Box, IBox, IBoxCSS } from './Box';
import { ITheme, useTheme } from './theme';

// TODO better active styling

export interface IButton extends IBox<HTMLButtonElement> {
  disabled?: boolean;
}

export const Button: React.FunctionComponent<IButton> = React.forwardRef<HTMLButtonElement, IButton>((props, ref) => {
  const { as = 'button', css, ...rest } = props;

  const { button } = useTheme();

  return <Box px={3} py={2} borderRadius={2} {...rest} as={as} ref={ref} css={[buttonStyles(button, props), css]} />;
});

export const buttonStyles = (theme: ITheme['button'], { disabled }: IButton = {}): IBoxCSS => {
  return [
    {
      color: theme.fg,
      backgroundColor: theme.bg,
      borderColor: theme.border,

      appearance: 'none',
      cursor: 'pointer',

      ':focus': {
        outline: 'none',
      },

      ':hover': {
        backgroundColor: theme.hoverBg,
        color: theme.hoverFg,
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
