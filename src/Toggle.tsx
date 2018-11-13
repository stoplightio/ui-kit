import * as React from 'react';

import { Box } from './Box';
import { Flex } from './Flex';
import { Icon } from './Icon';
import { Input } from './Input';
import { styled } from './utils';

export interface IToggleProps {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  width?: string;
  height?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Toggle = styled<IToggleProps>((props: IToggleProps) => {
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
          radius="100px"
          bg={checked ? 'toggle.checked.bg' : 'toggle.bg'}
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
            fg={checked ? 'toggle.checked.fg' : 'toggle.fg'}
            css={{
              paddingLeft: checked ? '22px' : '4px',
              transition: 'padding .15s ease-in-out, color .25s ease-in-out',
            }}
          />
        </Flex>
      </Box>
    </span>
  );
})``;
