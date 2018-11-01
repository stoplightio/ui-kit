import AutosizeInput from 'react-input-autosize';
import { styled } from '../utils';

export interface IInputProps {
  type?: string;
}

export const Input = styled<IInputProps, 'div'>(AutosizeInput).attrs({
  type: ({ type }: IInputProps) => type || 'text',
})(
  {
    // @ts-ignore
    input: {
      cursor: 'text',
      opacity: 0.85,
      display: 'block',

      ':focus': {
        outline: 'none',
        opacity: 1,
      },
    },
    as: 'input',
  },
  // disabled style
  props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }
);

Input.defaultProps = {
  display: 'block',
  weight: 'semibold',
  align: 'left',
  m: 'none',
  px: 'md',
  py: 'sm',
  border: 'xs',
  radius: 'md',

  // reference colors by path in theme
  // if path does not exist it at component, default to color.fg || color.bg || color.border respectively
  fg: 'input.fg',
  bg: 'input.bg',
  borderColor: 'input.border',
};
