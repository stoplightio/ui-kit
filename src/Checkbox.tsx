/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import noop = require('lodash/noop');
import { FunctionComponent, ReactEventHandler, useState } from 'react';

import { Box, Flex, IBox, Icon, useTheme } from './';

interface ICheckboxInputProps {
  id: IBox['id'];
  onChange: ReactEventHandler<HTMLInputElement>;
}

interface ICheckboxInput extends ICheckboxInputProps {}

const CheckboxInput: FunctionComponent<ICheckboxInput> = props => {
  return jsx(Box, {
    ...props,
    as: 'input',
    type: 'checkbox',
    position: 'absolute',
    style: {
      clip: 'rect(1px, 1px, 1px, 1px)',
    },
  });
};

interface ICheckboxInnerProps {
  isChecked: boolean;
  isDisabled: boolean;
  width?: IBox['width'];
  height?: IBox['height'];
}

export interface ICheckboxInner extends ICheckboxInnerProps {}

const CheckboxInner: FunctionComponent<ICheckboxInner> = props => {
  const css = checkboxInnerStyles(props);

  return jsx(
    Flex,
    {
      as: 'span',
      css,
    },
    props.isChecked && [jsx(Icon, { icon: 'check', backgroundColor: 'inherit' })]
  );
};

const checkboxInnerStyles = ({ isDisabled, isChecked, height = '20px', width = '20px' }: ICheckboxInner) => {
  const theme = useTheme();

  return {
    margin: 0,
    padding: 0,
    borderRadius: '5px',
    backgroundColor: isChecked ? theme.checkbox.checkedBg : theme.checkbox.bg,
    color: theme.checkbox.fg,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    width,
    height,
    opacity: isDisabled ? 0.6 : 1,
    fontSize: '14px',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color .15s ease-in-out',
    overflow: 'hidden',
  };
};

export const Checkbox: FunctionComponent<ICheckbox> = props => {
  const { id, disabled: isDisabled, width, height, onChange = noop, ...rest } = props;
  const css = checkboxStyles();

  const [checked, setValue] = useState<boolean>(props.checked || false);
  const isChecked = props.hasOwnProperty('checked') ? props.checked : checked;

  const handleChange: ReactEventHandler<HTMLInputElement> = event => {
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
      jsx(CheckboxInput, {
        id,
        onChange: handleChange,
      }),
      jsx(CheckboxInner, {
        isChecked,
        isDisabled,
        height,
        width,
      }),
    ]
  );
};

export interface ICheckboxProps {
  id: IBox['id'];
  onChange?: (checked: boolean) => void;
}

export interface ICheckbox extends ICheckboxProps, Omit<IBox<HTMLLabelElement>, 'as|onChange'> {}

export const checkboxStyles = () => ({
  display: 'inline-block',
});
