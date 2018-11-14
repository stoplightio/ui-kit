import * as React from 'react';
import AutosizeTextarea from 'react-textarea-autosize';

import { ITextProps, Text } from './Text';
import { styled } from './utils';

export interface ITextareaProps extends ITextProps {
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;

  value?: string;
  onChange?: (value: string) => void;
}

export interface ITextareaState {
  value?: string;
}

export class BasicTextArea extends React.Component<ITextareaProps, ITextareaState> {
  constructor(props: ITextareaProps) {
    super(props);
    this.state = { value: this.props.value };
  }

  private onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ value: event.target.value });

    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  };

  public render() {
    const { autosize, minRows, maxRows, ...rest } = this.props;
    const value = (this.props.hasOwnProperty('value') ? this.props.value : this.state.value) || '';

    if (autosize) {
      return <AutosizeTextarea {...rest} minRows={minRows} maxRows={maxRows} value={value} onChange={this.onChange} />;
    }

    return React.createElement('textarea', { ...rest, value, onChange: this.onChange });
  }
}

export const Textarea = styled<ITextareaProps>(Text as any)(
  {
    // @ts-ignore
    ':focus': {
      outline: 'none',
      opacity: 1,
    },
  },
  // @ts-ignore
  props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  // @ts-ignore
  props =>
    props.autosize && {
      resize: 'none',
    }
);

Textarea.defaultProps = {
  as: BasicTextArea,
  px: 'md',
  py: 'sm',
  border: 'xs',
  radius: 'md',

  // reference colors by path in theme
  // if path does not exist it at component, default to color.fg || color.bg || color.border respectively
  fg: 'textarea.fg',
  bg: 'textarea.bg',
  borderColor: 'textarea.border',
};
