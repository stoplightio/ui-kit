import noop = require('lodash/noop');
import * as React from 'react';

import { Box } from './Box';
import { Flex } from './Flex';
import { Icon } from './Icon';
import { styled } from './utils';

export interface IToggleProps {
  id?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  onChange?: (checked: boolean) => void;
}

export const BasicToggle = (props: IToggleProps) => {
  const { id, className, width, height, disabled, onChange = noop } = props;

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
        id={id}
        checked={isChecked || false}
        disabled={disabled}
        onChange={handleChange}
        style={{ position: 'absolute', clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <Flex
        as="span"
        display="block"
        m="none"
        p="none"
        radius="100px"
        bg={isChecked ? 'toggle.checked.bg' : 'toggle.bg'}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        width={width || '40px'}
        height={height || '20px'}
        opacity={disabled ? 0.6 : 1}
        items="center"
        css={{
          fontSize: '14px',
          transition: 'background-color .15s ease-in-out',
        }}
      >
        <Icon
          icon="circle"
          fg={isChecked ? 'toggle.checked.fg' : 'toggle.fg'}
          css={{
            paddingLeft: isChecked ? '22px' : '4px',
            transition: 'padding .15s ease-in-out, color .25s ease-in-out',
          }}
        />
      </Flex>
    </Box>
  );
};

export const Toggle = styled<IToggleProps>(BasicToggle as any)``;
