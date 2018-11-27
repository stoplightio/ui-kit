import noop = require('lodash/noop');
import * as React from 'react';

import { Box, IBoxProps } from './Box';
import { Flex } from './Flex';
import { Icon } from './Icon';
import { styled } from './utils';

export interface ICheckboxProps {
  id?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  onChange?: (checked: boolean) => void;

  attributes?: IBoxProps;
}

export const BasicCheckbox = (props: ICheckboxProps) => {
  const { id, className, width, height, disabled, onChange = noop, attributes } = props;

  const [checked, setValue] = React.useState(props.checked || false);
  const isChecked = props.hasOwnProperty('checked') ? props.checked : checked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <Box as="label" display="inline-block" id={id} className={className}>
      <input
        type="checkbox"
        checked={isChecked || false}
        disabled={disabled}
        onChange={handleChange}
        style={{ position: 'absolute', clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <Flex
        as="span"
        display="block"
        m="@none"
        p="@none"
        radius="@md"
        items="center"
        justify="center"
        bg={isChecked ? '@checkbox.checked.bg' : '@checkbox.bg'}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        width={width || '20px'}
        height={height || '20px'}
        opacity={disabled ? 0.6 : 1}
        css={{
          fontSize: '14px',
          transition: 'background-color .15s ease-in-out',
        }}
        {...attributes}
      >
        {isChecked && <Icon icon="check" fg="@checkbox.checked.fg" />}
      </Flex>
    </Box>
  );
};

export const Checkbox = styled<ICheckboxProps>(BasicCheckbox as any)``;
