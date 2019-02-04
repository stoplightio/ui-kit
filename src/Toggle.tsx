/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { ChangeEventHandler, FunctionComponent, useCallback, useState } from 'react';

import { Box, Flex, IBox, IBoxCSS, useTheme } from './';

export interface IToggle extends Omit<IBox<HTMLLabelElement>, 'as|onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Toggle: FunctionComponent<IToggle> = props => {
  const { disabled: isDisabled, onChange, ...rest } = props;

  const [checked, setValue] = useState<boolean>(!!props.checked);
  const isChecked = props.hasOwnProperty('checked') ? !!props.checked : checked;

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target }) => {
    setValue(target.checked);
    if (onChange) onChange(target.checked);
  }, []);

  return (
    <Flex {...rest} as="label" css={toggleStyles({ isDisabled, isChecked })}>
      <Box
        as="input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        position="absolute"
        css={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <Box as="span" css={circleStyles({ isChecked })} />
    </Flex>
  );
};

interface IToggleStyles {
  isChecked?: boolean;
  isDisabled?: boolean;
}

const toggleStyles = ({ isDisabled, isChecked }: IToggleStyles): IBoxCSS => {
  const { toggle } = useTheme();

  return [
    {
      backgroundColor: toggle.bg,
      border: toggle.border ? `1px solid ${toggle.border}` : 'none',

      height: '16px',
      width: '32px',
      padding: 0,
      margin: 0,
      borderRadius: '100px',

      fontSize: '14px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',

      transition: 'background-color .15s ease-in-out',
    },
    isChecked && {
      backgroundColor: toggle.checked,
    },
    isDisabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  ];
};

const circleStyles = ({ isChecked }: IToggleStyles) => {
  const { toggle } = useTheme();

  return [
    {
      backgroundColor: toggle.fg,

      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginLeft: '4px',

      display: 'inline-block',
      transition: 'margin-left .15s ease-in-out',
    },
    isChecked && {
      // toggle width - circle width - original margin left
      marginLeft: '18px',
    },
  ];
};
