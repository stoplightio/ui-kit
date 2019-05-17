import { Omit } from '@stoplight/types';
import cn from 'classnames';
import * as React from 'react';

import ReactSimpleCodeEditor from 'react-simple-code-editor';

import { highlightCode } from './utils/highlightCode';

/**
 * CODE EDITOR
 */
interface ICodeEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange(code: string): any;
  padding?: number | string;
  language?: string;
  autoFocus?: boolean;
}

const CodeEditor = React.forwardRef<ReactSimpleCodeEditor, ICodeEditorProps>((props, ref) => {
  const { autoFocus, language, onChange, value, placeholder, className, padding, style, ...rest } = props;

  // Highlight code on change
  const highlight = React.useCallback((code: string) => (language ? highlightCode(code, language) : code), [language]);

  return (
    <ReactSimpleCodeEditor
      {...rest}
      // @ts-ignore FIXME type error
      ref={ref}
      className={cn(className, 'bp3-code-editor')}
      style={style}
      placeholder={placeholder}
      autoFocus={autoFocus}
      value={value}
      onValueChange={onChange}
      highlight={highlight}
      padding={padding}
    />
  );
});
CodeEditor.displayName = 'CodeEditor';

/**
 * EXPORTS
 */
export { CodeEditor, ICodeEditorProps };
