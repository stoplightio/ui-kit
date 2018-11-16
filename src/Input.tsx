import * as React from 'react';
import AutosizeInput from 'react-input-autosize';

import { ITextProps, Text } from './Text';
import { styled } from './utils';

export interface IInputProps extends ITextProps {
  type?: string;
  autosize?: boolean;
  as?: any;
}

const StyledAutosizeInput = ({ autosize, className, ...rest }: IInputProps) => (
  <AutosizeInput inputClassName={className} {...rest} />
);

export const Input = styled<IInputProps>(Text as any).attrs({
  as: ({ autosize }: IInputProps) => (autosize ? StyledAutosizeInput : 'input'),
})(
  {
    // @ts-ignore
    ':focus': {
      outline: 'none',
      opacity: 1,
    },
  },
  // disabled style
  // @ts-ignore
  props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }
);

Input.defaultProps = {
  px: '@md',
  py: '@sm',
  border: '@xs',
  radius: '@md',

  // reference colors by path in theme
  // if path does not exist it at component, default to color.fg || color.bg || color.border respectively
  fg: '@input.fg',
  bg: '@input.bg',
  borderColor: '@input.border',
};
