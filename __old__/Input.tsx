import noop = require('lodash/noop');
import * as React from 'react';
import AutosizeInput from 'react-input-autosize';

import { ITextProps, Text } from './Text';
import { styled } from './utils';

export interface IInputProps extends ITextProps {
  type?: string;
  autosize?: boolean;
  value?: string | number;
  onChange?: (value?: string | number) => void;
}

export interface IInputState {
  value?: string | number;
}

export const BasicInput = (props: IInputProps) => {
  const { autosize, className, onChange = noop, ...rest } = props;

  const [value, setValue] = React.useState(props.value || '');
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  if (autosize) {
    return (
      <AutosizeInput
        inputClassName={className}
        placeholderIsMinWidth={true}
        {...rest}
        value={internalValue}
        onChange={handleChange}
      />
    );
  }

  return React.createElement('input', { className, ...rest, value: internalValue, onChange: handleChange });
};

export const Input = styled<IInputProps, 'input'>(Text as any)(
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
