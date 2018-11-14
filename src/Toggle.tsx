import * as React from 'react';

import { Box } from './Box';
import { Flex } from './Flex';
import { Icon } from './Icon';
import { Input } from './Input';
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

export interface IToggleState {
  checked?: boolean;
}

export class BasicToggle extends React.Component<IToggleProps, IToggleState> {
  constructor(props: IToggleProps) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ checked: event.target.checked });

    if (this.props.onChange) {
      this.props.onChange(event.target.checked);
    }
  };

  public render() {
    const { checked: stateChecked } = this.state;

    const { id, className, width, height, disabled, checked: propsChecked } = this.props;
    const checked = this.props.hasOwnProperty('checked') ? propsChecked : stateChecked;

    return (
      <Box as="label" display="inline-block" id={id} className={className}>
        <Input
          type="checkbox"
          id={id}
          checked={checked || false}
          disabled={disabled}
          onChange={this.onChange}
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
    );
  }
}

export const Toggle = styled<IToggleProps>(BasicToggle as any)``;
