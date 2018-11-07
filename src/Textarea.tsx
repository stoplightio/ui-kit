import AutosizeTextarea from 'react-textarea-autosize';

import { ITextProps, Text } from './Text';
import { styled } from './utils';

export interface ITextareaProps extends ITextProps {
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  as?: any;
}

export const Textarea = styled<ITextareaProps>(Text as any).attrs({
  as: ({ autosize }: ITextareaProps) => (autosize ? AutosizeTextarea : 'textarea'),
})(
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
