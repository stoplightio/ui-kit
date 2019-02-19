import { Omit } from '@stoplight/types';
import * as React from 'react';
import { ChangeEventHandler, useCallback, useState } from 'react';

import { Box, Flex, IBox, useTheme } from './';

export interface ICheckbox extends Omit<IBox<HTMLLabelElement>, 'as|onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<HTMLOrSVGElement, ICheckbox>((props, ref) => {
  const { disabled: isDisabled, onChange, invalid, ...rest } = props;

  const [checked, setValue] = useState<boolean>(!!props.checked);
  const isChecked = props.hasOwnProperty('checked') ? !!props.checked : checked;

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    setValue(target.checked);
    if (onChange) onChange(target.checked);
  }, []);

  return (
    // @ts-ignore FIXME issue with border-box in styling
    <Flex {...rest} as="label" ref={ref} css={checkboxStyles({ isDisabled, isChecked, invalid })}>
      <Box
        as="input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        position="absolute"
        css={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <svg aria-hidden="true" viewBox="0 0 512 512" width="10px" height="10px">
        <path
          fill="currentColor"
          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        />
      </svg>
    </Flex>
  );
});

export const checkboxStyles = ({ isChecked, isDisabled, invalid }: ICheckboxStyles) => {
  const { checkbox: baseTheme } = useTheme();

  const invalidTheme = {
    fg: baseTheme.invalidFg,
    bg: baseTheme.invalidBg,
    border: baseTheme.invalidBorder,
    checked: baseTheme.invalidChecked,
  };

  const theme = { ...baseTheme };
  if (invalid) Object.assign(theme, invalidTheme);

  return [
    {
      color: theme.bg,
      backgroundColor: theme.bg,
      border: theme.border ? `1px solid ${theme.border}` : 'none',

      height: '14px',
      width: '14px',
      margin: 0,
      padding: 0,
      borderRadius: '3px',
      boxSizing: 'border-box',

      cursor: 'pointer',
      overflow: 'hidden',

      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',

      transition: 'background-color .15s ease-in-out',
    },
    isChecked && {
      color: theme.fg,
      backgroundColor: theme.checked,
    },
    isDisabled && {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  ];
};

interface ICheckboxStyles {
  isChecked: boolean;
  isDisabled: boolean;
  invalid: boolean;
}
