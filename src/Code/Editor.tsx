import { css } from '@emotion/core';
import { Omit } from '@stoplight/types';
import 'prismjs/components/';
import * as React from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';
import { Box, IBox } from '../Box';
import { codeStyles } from './styles';
import { highlightCode } from './utils/highlightCode';

export interface IEditor extends Omit<IBox, 'onChange'> {
  value: string;
  language: string;
  onChange(code: string): any;
}

export const Editor = React.forwardRef<HTMLDivElement, IEditor>((props, ref) => {
  const { language, onChange, value, ...rest } = props;
  const highlight = React.useCallback(() => highlightCode(value, language), [value, language]);

  return (
    <Box {...rest} css={codeEditorStyles()}>
      <ReactSimpleCodeEditor
        // @ts-ignore FIXME type erorr
        ref={ref}
        value={value}
        onValueChange={onChange}
        highlight={highlight}
      />
    </Box>
  );
});

export const codeEditorStyles = () => {
  return [
    ...codeStyles(),
    css`
      textarea {
        &:focus {
          outline: none;
        }
      }
    `,
  ];
};
