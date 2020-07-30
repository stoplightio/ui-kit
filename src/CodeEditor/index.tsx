import { Intent } from '@blueprintjs/core';
import cn from 'classnames';
import * as React from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';

import { Classes } from '../classes';
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
  showLineNumbers?: boolean;
  intent?: Intent;
}

const CodeEditor = React.forwardRef<ReactSimpleCodeEditor, ICodeEditorProps>((props, ref) => {
  const {
    autoFocus,
    language,
    onChange,
    value,
    placeholder,
    className,
    padding,
    style,
    showLineNumbers,
    intent,
    ...rest
  } = props;

  // Highlight code on change
  const highlight = React.useCallback((code: string) => highlightCode(code, language || '', showLineNumbers), [
    language,
    showLineNumbers,
  ]);

  return (
    <ReactSimpleCodeEditor
      {...rest}
      // @ts-ignore FIXME type error
      ref={ref}
      className={cn(Classes.CODE_EDITOR, className, {
        [`${Classes.CODE_EDITOR}--line-numbers`]: showLineNumbers,
        [`${Classes.CODE_EDITOR}--${intent}`]: intent !== void 0,
      })}
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
