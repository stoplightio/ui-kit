import { Omit } from '@stoplight/types';
import * as React from 'react';
import { ChangeEventHandler, useCallback, useState } from 'react';

import { Box, Flex, IBox, IBoxCSS, ITheme, useTheme } from './';
import { Variant } from './types';
import { getVariant } from './utils/getVariant';

export interface ICheckbox extends Omit<IBox<HTMLLabelElement>, 'as|onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: Variant;
}

const Checkbox: React.FunctionComponent<ICheckbox> = React.forwardRef<HTMLLabelElement, ICheckbox>(function Checkbox(
  props,
  ref
) {
  const { disabled: isDisabled, onChange, variant, ...rest } = props;

  const { checkbox: baseTheme } = useTheme();

  const [checked, setValue] = useState<boolean>(!!props.checked);
  const isChecked = props.hasOwnProperty('checked') ? !!props.checked : checked;

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    setValue(target.checked);
    if (onChange) onChange(target.checked);
  }, []);

  return (
    <Flex {...rest} as="label" ref={ref} css={checkboxStyles(baseTheme, { isDisabled, isChecked, variant })}>
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

Checkbox.displayName = 'Checkbox';
export { Checkbox };

export const checkboxStyles = (
  baseTheme: ITheme['checkbox'],
  { isChecked, isDisabled, variant }: ICheckboxStyles
): IBoxCSS => {
  const theme = { ...baseTheme, ...getVariant(baseTheme, variant) };

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
  variant?: Variant;
}
