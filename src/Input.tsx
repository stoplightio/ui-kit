/* @jsx jsx */

import { jsx } from '@emotion/core';
import noop = require('lodash/noop');
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface IInput extends IBox<HTMLInputElement> {
  autosize?: boolean;
}

const AutosizeWrapper: FunctionComponent<Partial<{ className: string }>> = ({ className, ...props }) => (
  <AutosizeInput {...props} inputClassName={className} placeholderIsMinWidth />
);

export const Input: FunctionComponent<IInput> = props => {
  const { as = 'input', autosize, onChange = noop, type, ...rest } = props;

  // TODO: do we want controlled mode here?
  const [value, setValue] = useState(props.value);
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  // FIXME: might not work with boolean inputs such as radio/checkbox
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChange(event);
  };

  return (
    <Box
      {...rest}
      as={autosize ? AutosizeWrapper : as}
      type={type}
      value={internalValue}
      onChange={handleChange}
      defaultCSS={inputStyles(props)}
    />
  );
};

const inputStyles = ({ disabled }: IInput) => {
  const { input } = useTheme();

  return [
    {
      color: input.fg,
      backgroundColor: input.bg,
      border: input.border ? `1px solid ${input.border}` : 'none',

      padding: '0px 10px',
      minHeight: '30px',
      borderRadius: '3px',
      boxSizing: 'border-box',

      ':focus': {
        outline: 'none',
      },
    },
    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  ];
};
