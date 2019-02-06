/* @jsx jsx */

import { jsx } from '@emotion/core';
import noop = require('lodash/noop');
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import AutosizeTextarea from 'react-textarea-autosize';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export interface ITextarea extends IBox<HTMLTextAreaElement> {
  autosize?: boolean;
}

export const Textarea: FunctionComponent<ITextarea> = props => {
  const { autosize, as = 'textarea', onChange = noop, ...rest } = props;

  // todo: do we want controlled mode here?
  const [value, setValue] = useState<string>(props.value || '');
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  const handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
    onChange(event);
  };

  return jsx(Box, {
    ...rest,
    as: autosize ? AutosizeTextarea : as,
    value: internalValue,
    onChange: handleChange,
    defaultCSS: textareaStyles(props),
  });
};

export const textareaStyles = ({ autosize, disabled }: ITextarea) => {
  const { textarea } = useTheme();

  return [
    {
      color: textarea.fg,
      backgroundColor: textarea.bg,
      border: textarea.border ? `1px solid ${textarea.border}` : 'none',

      // TODO the top/bottom padding is a rough estimation find a better solution
      padding: '7px 10px',
      minHeight: '30px',
      minWidth: '147px',
      lineHeight: '15px',
      borderRadius: '3px',
      boxSizing: 'border-box',

      ':focus': {
        outline: 'none',
      },
    },
    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    autosize && {
      resize: 'none',
    },
  ];
};
