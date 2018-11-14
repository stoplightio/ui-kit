import * as React from 'react';

import { Box } from './Box';
import { Flex } from './Flex';
import { Icon } from './Icon';
import { Input } from './Input';
import { styled } from './utils';

export interface ICheckboxProps {
  id?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  onChange?: (checked: boolean) => void;
}

export interface ICheckboxState {
  checked?: boolean;
}

export class BasicCheckbox extends React.Component<ICheckboxProps, ICheckboxState> {
  constructor(props: ICheckboxProps) {
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
    );
  }
}

export const Checkbox = styled<ICheckboxProps>(BasicCheckbox as any)``;
