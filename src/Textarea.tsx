import * as React from 'react';

import { Omit } from '@stoplight/types';
import noop = require('lodash/noop');
import AutosizeTextarea from 'react-textarea-autosize';

import { Box, IBox, IBoxCSS } from './Box';
import { ITheme, useTheme } from './theme';
import { Variant } from './types';
import { getVariant } from './utils/getVariant';

export interface ITextarea extends Omit<IBox<HTMLTextAreaElement>, 'as'> {
  autosize?: boolean;
  variant?: Variant;
}

const Textarea: React.FunctionComponent<ITextarea> = React.forwardRef<HTMLTextAreaElement, ITextarea>(function Textarea(
  props,
  ref
) {
  const { autosize, onChange = noop, variant, css, ...rest } = props;

  const { textarea: theme } = useTheme();

  // TODO: do we want controlled mode here?
  const [value, setValue] = React.useState<string>(props.value || '');
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  const handleChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
    onChange(event);
  };

  return (
    <Box
      {...rest}
      as={autosize ? AutosizeTextarea : 'textarea'}
      ref={ref}
      value={internalValue}
      onChange={handleChange}
      css={[textareaStyles(theme, props), css]}
    />
  );
});

Textarea.displayName = 'Textarea';

export const textareaStyles = (baseTheme: ITheme['textarea'], { autosize, disabled, variant }: ITextarea): IBoxCSS => {
  const theme = { ...baseTheme, ...getVariant(baseTheme, variant) };

  return [
    {
      color: theme.fg,
      backgroundColor: theme.bg,
      border: theme.border ? `1px solid ${theme.border}` : 'none',

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

export { Textarea };
