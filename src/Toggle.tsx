/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { ChangeEventHandler, FunctionComponent, useCallback, useState } from 'react';

import { Box, Flex, IBox, IBoxCSS, useTheme } from './';

const ToggleCircle: FunctionComponent<IToggleCircle> = props => {
  const css = circleStyles(props);

  return <Box as="span" css={css} />;
};

interface IToggleCircleProps {
  isChecked: boolean;
}

interface IToggleCircle extends IToggleCircleProps {}

const circleStyles = ({ isChecked }: IToggleCircleProps) => {
  const theme = useTheme();

  return {
    display: 'inline-block',
    borderRadius: '50%',
    width: '14px',
    height: '14px',
    backgroundColor: isChecked ? theme.toggle.checkedFg : theme.toggle.checkedBg,
    marginLeft: isChecked ? '22px' : '4px',
    transition: 'margin-left .15s ease-in-out, background-color .25s ease-in-out',
  };
};

export const Toggle: FunctionComponent<IToggle> = props => {
  const { id, disabled: isDisabled, onChange, ...rest } = props;

  const [checked, setValue] = useState<boolean>(props.checked || false);
  const isChecked = props.hasOwnProperty('checked') ? props.checked || false : checked;

  const css = toggleStyles({ isDisabled, isChecked });

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
        checked={checked}
        onChange={handleChange}
        position="absolute"
        css={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <ToggleCircle isChecked={isChecked} />
    </Flex>
  );
};

export interface IToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface IToggle extends IToggleProps, Omit<IBox<HTMLLabelElement>, 'as|onChange'> {}

const toggleStyles = ({ isDisabled, isChecked }: IToggleStyles): IBoxCSS => {
  const theme = useTheme();

  return {
    alignItems: 'center',
    backgroundColor: isChecked ? theme.toggle.checkedBg : theme.toggle.bg,
    borderRadius: '100px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    height: '20px',
    opacity: isDisabled ? 0.6 : 1,
    padding: 0,
    margin: 0,
    width: '40px',
    transition: 'background-color .15s ease-in-out',
  };
};

interface IToggleStyles {
  isChecked: boolean;
  isDisabled: boolean;
}
