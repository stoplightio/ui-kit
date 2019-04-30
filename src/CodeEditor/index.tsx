import { Omit } from '@stoplight/types';
import * as cn from 'classnames';
import * as React from 'react';

import ReactSimpleCodeEditor from 'react-simple-code-editor';

import { highlightCode } from './utils/highlightCode';

/**
 * CODE EDITOR
 */
interface ICodeEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange(code: string): any;
  language?: string;
  autoFocus?: boolean;
}

const CodeEditor: React.FunctionComponent<ICodeEditorProps> = React.forwardRef<HTMLDivElement, ICodeEditorProps>(
  function Editor(props, ref) {
    const { autoFocus, language, onChange, value, placeholder, className, ...rest } = props;

    // Highlight code on change
    const highlight = React.useCallback(code => (language ? highlightCode(code, language) : code), [language]);

    return (
      <div className={cn('bp3-code-editor', className)} {...rest}>
        {!value && placeholder && <span className="absolute text-darken-6">{placeholder}</span>}
        <ReactSimpleCodeEditor
          autoFocus={autoFocus}
          // @ts-ignore FIXME type erorr
          ref={ref}
          value={value}
          onValueChange={onChange}
          highlight={highlight}
        />
      </div>
    );
  }
);

/**
 * EXPORTS
 */
export { CodeEditor, ICodeEditorProps };
