/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { ChangeEventHandler, FunctionComponent, useCallback, useState } from 'react';

import { Box, Flex, IBox, useTheme } from './';

export interface ICheckbox extends Omit<IBox<HTMLLabelElement>, 'as|onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: FunctionComponent<ICheckbox> = props => {
  const { disabled: isDisabled, onChange, ...rest } = props;

  const [checked, setValue] = useState<boolean>(!!props.checked);
  const isChecked = props.hasOwnProperty('checked') ? !!props.checked : checked;

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    setValue(target.checked);
    if (onChange) onChange(target.checked);
  }, []);

  return (
    // @ts-ignore FIXME border-box causes error in css
    <Flex {...rest} as="label" defaultCSS={checkboxStyles({ isDisabled, isChecked })}>
      <Box
        as="input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        position="absolute"
        defaultCSS={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <svg aria-hidden="true" viewBox="0 0 512 512" width="10px" height="10px">
        <path
          fill="currentColor"
          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        />
      </svg>
    </Flex>
  );
};

export const checkboxStyles = ({ isChecked, isDisabled }: ICheckboxStyles) => {
  const { checkbox } = useTheme();

  return [
    {
      color: checkbox.bg,
      backgroundColor: checkbox.bg,
      border: checkbox.border ? `1px solid ${checkbox.border}` : 'none',

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
      color: checkbox.fg,
      backgroundColor: checkbox.checked,
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
}
