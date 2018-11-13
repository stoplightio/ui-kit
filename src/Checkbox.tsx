import * as React from 'react';

import { Box } from './Box';
import { Flex } from './Flex';
import { Icon } from './Icon';
import { Input } from './Input';
import { styled } from './utils';

export interface ICheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  width?: string;
  height?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = styled<ICheckboxProps>((props: ICheckboxProps) => {
  const { id, className, checked, width, height, disabled, onChange } = props;

  return (
    <span className={className}>
      <Box display="inline-block">
        <Input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          position="absolute"
          css={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
        />
        <Flex
          as="span"
          display="block"
          m="none"
          p="none"
          radius="md"
          items="center"
          justify="center"
          bg={checked ? 'toggle.checked.bg' : 'toggle.bg'}
          cursor={disabled ? 'not-allowed' : 'pointer'}
          width={width || '20px'}
          height={height || '20px'}
          opacity={disabled ? 0.6 : 1}
          css={{
            fontSize: '14px',
            transition: 'background-color .15s ease-in-out',
          }}
        >
          {checked && <Icon icon="check" fg="toggle.checked.fg" />}
        </Flex>
      </Box>
    </span>
  );
})``;
