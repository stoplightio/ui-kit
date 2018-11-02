import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import { styled } from '../utils';
import { ITextProps, Text } from './Text';

export interface IInputProps extends ITextProps {
  type?: string;
  autosize?: boolean;
  as?: any;
}

const InputStyled = styled<IInputProps>(
  ({ autosize, className, ...rest }) =>
    autosize ? <AutosizeInput inputClassName={className} {...rest} /> : <input {...rest} />
).attrs({
  type: ({ type }: IInputProps) => type || 'text',
  as: ({ autosize }: IInputProps) => (autosize ? AutosizeInput : 'input'),
})(
  {
    // @ts-ignore
    input: {
      border: '0 none',
      padding: 0,
      cursor: 'text',
      opacity: 0.85,
      display: 'block',

      ':focus': {
        outline: 'none',
        opacity: 1,
      },
    },

    ':focus': {
      outline: 'none',
      opacity: 1,
    },
  },
  // disabled style
  props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }
);

export const Input = InputStyled.withComponent(Text);

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
