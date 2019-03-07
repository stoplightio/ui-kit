import * as React from 'react';

import { Omit } from '@stoplight/types';
import noop = require('lodash/noop');
import AutosizeInput from 'react-input-autosize';

import { Box, IBox } from './Box';
import { ITheme, useTheme } from './theme';

export interface IInput extends Omit<IBox<HTMLInputElement>, 'as'> {
  autosize?: boolean;
  invalid?: boolean;
}

export interface IAutosizeInput {
  className?: string;
}

const AutosizeWrapper: React.FunctionComponent<IAutosizeInput> = React.forwardRef<HTMLInputElement, IAutosizeInput>(
  ({ className, ...props }, ref) => (
    // @ts-ignore
    <AutosizeInput {...props} ref={ref} inputClassName={className} placeholderIsMinWidth />
  )
);

export const Input: React.FunctionComponent<IInput> = React.forwardRef<HTMLInputElement, IInput>(function Input(
  props,
  ref
) {
  const { autosize, onChange = noop, type, invalid, css, ...rest } = props;

  const { input: theme } = useTheme();

  // TODO: do we want controlled mode here?
  const [value, setValue] = React.useState(props.value);
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  // FIXME: might not work with boolean inputs such as radio/checkbox
  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      setValue(e.target.value);
      onChange(e);
    },
    [onChange, setValue]
  );

  return (
    <Box
      px={3}
      py={2}
      borderRadius={2}
      {...rest}
      as={autosize ? AutosizeWrapper : 'input'}
      ref={ref}
      type={type}
      value={internalValue}
      onChange={handleChange}
      css={inputStyles(theme, props)}
    />
  );
});

const inputStyles = (baseTheme: ITheme['input'], { disabled, invalid, css }: IInput) => {
  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  return [
    {
      color: theme.fg,
      backgroundColor: theme.bg,
      border: theme.border ? `1px solid ${theme.border}` : 'none',

      boxSizing: 'border-box',

      ':focus': {
        outline: 'none',
      },
    },

    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    css,
  ];
};
