import * as React from 'react';
import AutosizeInput from 'react-input-autosize';

import { ITextProps, Text } from './Text';
import { styled } from './utils';

export interface IInputProps extends ITextProps {
  type?: string;
  autosize?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export interface IInputState {
  value?: string | number;
}

export class BasicInput extends React.Component<IInputProps, IInputState> {
  constructor(props: IInputProps) {
    super(props);
    this.state = { value: this.props.value };
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });

    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  };

  public render() {
    const { autosize, className, ...rest } = this.props;
    const value = (this.props.hasOwnProperty('value') ? this.props.value : this.state.value) || '';

    if (autosize) {
      return <AutosizeInput inputClassName={className} {...rest} value={value} onChange={this.onChange} />;
    }

    return React.createElement('input', { className, ...rest, value, onChange: this.onChange });
  }
}

export const Input = styled<IInputProps, 'input'>(Text as any)(
  {
    // @ts-ignore
    ':focus': {
      outline: 'none',
      opacity: 1,
    },
  },
  // disabled style
  // @ts-ignore
  props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }
);

Input.defaultProps = {
  as: BasicInput,
  px: 'md',
  py: 'sm',
  border: 'xs',
  radius: 'md',

  // reference colors by path in theme
  // if path does not exist it at component, default to color.fg || color.bg || color.border respectively
  fg: 'input.fg',
  bg: 'input.bg',
  borderColor: 'input.border',
};
