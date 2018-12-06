import noop = require('lodash/noop');
import { FunctionComponent, ReactEventHandler, useState } from 'react';

import { jsx } from '@emotion/core';
import { createElement, SyntheticEvent } from 'react';
import { Box, Flex, IBox, useTheme } from './';
import { Icon } from './Icon';

interface IToggleInputProps {
  id?: string;
  onChange: ReactEventHandler<HTMLInputElement>;
}

const ToggleInput: FunctionComponent<IToggleInputProps> = props => {
  return jsx(Box, {
    ...props,
    as: 'input',
    type: 'checkbox',
    css: {
      position: 'absolute',
    },
    style: {
      clip: 'rect(1px, 1px, 1px, 1px)',
    },
  });
};

interface IToggleInnerProps {
  isChecked: boolean;
  isDisabled: boolean;
  height?: IBox['height'];
  width?: IBox['width'];
}

const ToggleInnerIcon: FunctionComponent<IToggleInnerProps> = props => {
  const css = toggleInnerIconStyles(props);

  return createElement(Icon, {
    icon: 'circle',
    css,
  });
};

const toggleInnerIconStyles = ({ isChecked }: IToggleInnerProps) => {
  const theme = useTheme();

  return {
    color: isChecked ? theme.toggle.checkedFg : theme.toggle.checkedBg,
    paddingLeft: isChecked ? '22px' : '4px',
    transition: 'padding-left .15s ease-in-out, color .25s ease-in-out',
  };
};

const ToggleInner: FunctionComponent<IToggleInnerProps> = props => {
  const css = toggleInnerStyles(props);

  return jsx(
    Flex,
    {
      as: 'span',
      css,
    },
    [createElement(ToggleInnerIcon, props)]
  );
};

const toggleInnerStyles = ({ isDisabled, isChecked, height = '20px', width = '40px' }: IToggleInnerProps) => {
  const theme = useTheme();

  return {
    display: 'block',
    margin: 0,
    padding: 0,
    borderRadius: '100px',
    backgroundColor: isChecked ? theme.toggle.checkedBg : theme.toggle.bg,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    width,
    height,
    opacity: isDisabled ? 0.6 : 1,
    fontSize: '14px',
    alignItems: 'center',
    transition: 'background-color .15s ease-in-out',
  };
};

export const Toggle: FunctionComponent<IToggle> = props => {
  const { id, disabled, height, width, onChange = noop, ...rest } = props;
  const css = toggleStyles();

  const [checked, setValue] = useState<boolean>(props.checked || false);
  const isChecked = props.hasOwnProperty('checked') ? props.checked : checked;

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.checked);
    onChange(event.currentTarget.checked);
  };

  return jsx(
    Box,
    {
      ...rest,
      as: 'label',
      htmlFor: id,
      css,
    },
    [
      createElement(ToggleInput, {
        id,
        onChange: handleChange,
      }),
      createElement(ToggleInner, {
        isChecked,
        isDisabled: !!disabled,
        height,
        width,
      }),
    ]
  );
};

export interface IToggleProps {
  onChange?: (checked: boolean) => void;
}

export interface IToggle
  extends IToggleProps,
    Pick<IBox<HTMLLabelElement>, Exclude<keyof IBox<HTMLLabelElement>, 'as|onChange'>> {}

const toggleStyles = () => ({
  display: 'inline-block',
});
