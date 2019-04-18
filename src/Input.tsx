import * as React from 'react';

import { Omit } from '@stoplight/types';
import noop = require('lodash/noop');
import AutosizeInput from 'react-input-autosize';

import { Box, IBox } from './Box';
import { ITheme, useTheme } from './theme';
import { Variant } from './types';
import { getVariant } from './utils/getVariant';

export interface IInput extends Omit<IBox<HTMLInputElement>, 'as'> {
  autosize?: boolean;
  variant?: Variant;
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

const Input: React.FunctionComponent<IInput> = React.forwardRef<HTMLInputElement, IInput>(function Input(props, ref) {
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
      p="10px"
      borderRadius={2}
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
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

Input.displayName = 'Input';

const inputStyles = (baseTheme: ITheme['input'], { disabled, variant, css }: IInput) => {
  const theme = { ...baseTheme, ...getVariant(baseTheme, variant) };

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

export { Input };
