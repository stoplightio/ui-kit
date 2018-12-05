import { jsx } from '@emotion/core';
import noop = require('lodash/noop');
import { FunctionComponent, HTMLAttributes, SyntheticEvent, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export type InputValue = boolean | number | string | undefined;

export const Input: FunctionComponent<IInput> = props => {
  const { autosize, onChange = noop, ...rest } = props;

  const css = inputStyles(props);

  const [value, setValue] = useState<InputValue>(props.value);
  // todo: do we want controlled mode here?
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChange(event);
  };

  if (autosize) {
    return jsx(Box, {
      as: AutosizeInput,
      placeholderIsMinWidth: true,
      ...rest,
      value: internalValue,
      onChange: handleChange,
      css,
    });
  }

  return jsx(Box, {
    as: 'input',
    ...rest,
    value: internalValue,
    onChange: handleChange,
    css,
  });
};

export interface IInput extends IInputProps, IBox, HTMLAttributes<HTMLInputElement> {}

export interface IInputProps {
  autosize?: boolean;
}

const inputStyles = ({ disabled }: IInput) => {
  const theme = useTheme();

  return [
    /* todo:
      {
        px: '@md',
        py: '@sm',
        border: '@xs',
        radius: '@md',
      }
    */
    {
      color: theme.input.fg,
      backgroundColor: theme.input.bg,
      borderColor: theme.input.borderColor,

      ':focus': {
        outline: 'none',
        opacity: 1,
      },
    },
    disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  ];
};
