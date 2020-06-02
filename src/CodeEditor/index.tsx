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
  showLineNumbers?: boolean;
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
      className={cn(className, 'bp3-code-editor', {
        'line-numbers': showLineNumbers,
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
