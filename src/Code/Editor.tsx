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

const Editor: React.FunctionComponent<IEditor> = React.forwardRef<HTMLDivElement, IEditor>(function Editor(props, ref) {
  const { autoFocus, language, onChange, value, css, ...rest } = props;
  const highlight = React.useCallback(() => highlightCode(value, language), [value, language]);

  return (
    <Box {...rest} css={[codeEditorStyles(), css]}>
      <ReactSimpleCodeEditor
        autoFocus={autoFocus}
        // @ts-ignore FIXME type erorr
        ref={ref}
        value={value}
        onValueChange={onChange}
        highlight={highlight}
      />
    </Box>
  );
});

Editor.displayName = 'Editor';

export const codeEditorStyles = () => {
  return [
    ...codeStyles(),
    {
      textarea: {
        '&:focus': {
          outline: 'none',
        },
      },
    },
  ];
};

export { Editor };
