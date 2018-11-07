import { ITextProps, Text } from './Text';
import { styled } from './utils';

export interface IButtonProps extends ITextProps {}

export const Button = styled<IButtonProps, 'button'>(Text as any)(
  {
    // @ts-ignore
    appearance: 'none',
    cursor: 'pointer',
    opacity: 0.85,

    ':focus': {
      outline: 'none',
    },

    ':hover': {
      opacity: 0.75,
    },

    ':active': {
      opacity: 1,
    },
  },
  // disabled style
  // @ts-ignore FIXME
  props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,

      ':hover': {
        opacity: 0.6,
      },
    }
);

Button.defaultProps = {
  as: 'button',
  display: 'inline-block',
  decoration: 'none',
  weight: 'semibold',
  align: 'center',
  px: 'md',
  py: 'sm',
  border: 'xs',
  radius: 'md',

  // reference colors by path in theme
  // if path does not exist it at component, default to color.fg || color.bg || color.border respectively
  fg: 'button.fg',
  bg: 'button.bg',
  borderColor: 'button.border',
};
