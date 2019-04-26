import { Omit } from '@stoplight/types';
import * as cn from 'classnames';
import * as React from 'react';

import { Classes } from '../classes';

import 'prismjs/components/';
import ReactSimpleCodeEditor from 'react-simple-code-editor';

import { highlightCode } from './utils/highlightCode';

/**
 * CODE EDITOR
 */
interface ICodeEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  language: string;
  autoFocus?: boolean;
  onChange(code: string): any;
}

const CodeEditor: React.FunctionComponent<ICodeEditorProps> = React.forwardRef<HTMLDivElement, ICodeEditorProps>(
  function Editor(props, ref) {
    const { autoFocus, language, onChange, value, className, ...rest } = props;
    const highlight = React.useCallback(() => highlightCode(value, language), [value, language]);

    return (
      <div className={cn(Classes.CODE_BLOCK, Classes.CODE_EDITOR, className)} {...rest}>
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
