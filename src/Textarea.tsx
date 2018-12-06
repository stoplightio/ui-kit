import { jsx } from '@emotion/core';
import noop = require('lodash/noop');
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import AutosizeTextarea from 'react-textarea-autosize';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export const Textarea: FunctionComponent<ITextarea> = props => {
  const { as = props.autosize ? AutosizeTextarea : 'textarea', autosize, onChange = noop, ...rest } = props;

  const css = textareaStyles(props);

  const [value, setValue] = useState<string>(props.value || '');
  // todo: do we want controlled mode here?
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  const handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
    onChange(event);
  };

  return jsx(Box, {
    ...rest,
    as,
    value: internalValue,
    onChange: handleChange,
    css,
  });
};

export interface ITextarea extends ITextareaProps, IBox<HTMLTextAreaElement> {}

export interface ITextareaProps {
  autosize?: boolean;
}

export const textareaStyles = ({ autosize, disabled }: ITextarea) => {
  const theme = useTheme();

  return [
    /* todo:
      {
        px: '@md',
        py: '@sm',
        border: '@xs',
        radius: '@md',
      }
    */
    {
      color: theme.textarea.fg,
      backgroundColor: theme.textarea.bg,
      borderColor: theme.textarea.borderColor,

      ':focus': {
        outline: 'none',
        opacity: 1,
      },
    },
    disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
    autosize && {
      resize: 'none',
    },
  ];
};
