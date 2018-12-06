import noop = require('lodash/noop');
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

export const BasicTextArea = (props: ITextareaProps) => {
  const { autosize, minRows, maxRows, onChange = noop, ...rest } = props;

  const [value, setValue] = React.useState(props.value || '');
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  if (autosize) {
    return (
      <AutosizeTextarea {...rest} minRows={minRows} maxRows={maxRows} value={internalValue} onChange={handleChange} />
    );
  }

  return React.createElement('textarea', { ...rest, value: internalValue, onChange: handleChange });
};

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
  px: '@md',
  py: '@sm',
  border: '@xs',
  radius: '@md',

  // reference colors by path in theme
  // if path does not exist it at component, default to color.fg || color.bg || color.border respectively
  fg: '@textarea.fg',
  bg: '@textarea.bg',
  borderColor: '@textarea.border',
};
