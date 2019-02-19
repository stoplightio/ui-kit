import * as React from 'react';

import noop = require('lodash/noop');
import AutosizeInput from 'react-input-autosize';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface IInput extends IBox<HTMLInputElement> {
  autosize?: boolean;
  invalid?: boolean;
}

const AutosizeWrapper: React.FunctionComponent<Partial<{ className: string }>> = ({ className, ...props }) => (
  <AutosizeInput {...props} inputClassName={className} placeholderIsMinWidth />
);

export const Input = React.forwardRef<HTMLOrSVGElement, IInput>((props, ref) => {
  const { as = 'input', autosize, onChange = noop, type, invalid, ...rest } = props;

  // TODO: do we want controlled mode here?
  const [value, setValue] = React.useState(props.value);
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  // FIXME: might not work with boolean inputs such as radio/checkbox
  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChange(event);
  };

  return (
    <Box
      {...rest}
      as={autosize ? AutosizeWrapper : as}
      ref={ref}
      type={type}
      value={internalValue}
      onChange={handleChange}
      // @ts-ignore FIXME borderSizing in styles type mismatch
      css={inputStyles(props)}
    />
  );
});

const inputStyles = ({ disabled, invalid }: IInput) => {
  const { input: baseTheme } = useTheme();

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
