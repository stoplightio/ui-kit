/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { ChangeEventHandler, FunctionComponent, useCallback, useState } from 'react';

import { Box, Flex, IBox, useTheme } from './';

export const Checkbox: FunctionComponent<ICheckbox> = props => {
  const { id, disabled: isDisabled, onChange, ...rest } = props;

  const [checked, setValue] = useState<boolean>(props.checked || false);
  const isChecked = props.hasOwnProperty('checked') ? props.checked : checked;

  const css = checkboxStyles({ isDisabled, isChecked });

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    setValue(target.checked);
    if (onChange !== undefined) {
      onChange(target.checked);
    }
  }, []);

  return (
    <Flex {...rest} as="label" css={css} htmlFor={id}>
      <Box
        as="input"
        type="checkbox"
        id={id}
        onChange={handleChange}
        position="absolute"
        css={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <svg aria-hidden="true" viewBox="0 0 512 512" width="14px" height="14px">
        <path
          fill="currentColor"
          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        />
      </svg>
    </Flex>
  );
};

export interface ICheckboxProps {
  id: IBox['id'];
  onChange?: (checked: boolean) => void;
}

export interface ICheckbox extends ICheckboxProps, Omit<IBox<HTMLLabelElement>, 'as|onChange'> {}

export const checkboxStyles = ({ isChecked, isDisabled }: ICheckboxStyles) => {
  const theme = useTheme();

  return {
    alignItems: 'center',
    backgroundColor: isChecked ? theme.checkbox.checkedBg : theme.checkbox.bg,
    borderRadius: '5px',
    color: isChecked ? theme.checkbox.fg : theme.checkbox.bg,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    height: '20px',
    justifyContent: 'center',
    opacity: isDisabled ? 0.6 : 1,
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    width: '20px',
    transition: 'background-color .15s ease-in-out',
  };
};

interface ICheckboxStyles {
  isChecked: boolean;
  isDisabled: boolean;
}
