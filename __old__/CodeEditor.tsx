import noop = require('lodash/noop');
import 'prismjs/components/';
import * as React from 'react';
import { useCallback } from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';
import styled from 'styled-components';
import { themeGet } from './utils';
import { highlightCode } from './utils/highlightCode';

export interface ICodeEditorProps {
  value: string;
  language: string;
  onChange?: (code: string) => any;
}

const defaultSupport = {
  css: 'CSS',
  javascript: 'JavaScript',
  markup: 'Markup',
  clike: 'C-like',
};

const optionalSupport = {
  // cpp: 'C++',
  // csharp: 'C#',
  // go: 'Go',
  // html: 'HTML',
  // http: 'HTTP',
  // java: 'Java',
  // json: 'JSON',
  // jsx: 'JSX',
  // markdown: 'Markdown',
  // objectivec: 'Objective-C',
  // perl: 'Perl',
  // php: 'PHP',
  // python: 'Python',
  // ruby: 'Ruby',
  // scala: 'Scala',
  // bash: 'Bash',
  // swift: 'Swift',
  // yaml: 'YAML',
};

/**
 * List of supported languages: https://prismjs.com/#languages-list
 */
export const supportedLanguages = {
  ...defaultSupport,
  ...optionalSupport,
};

export type ReactSimpleCodeEditorRef = ReactSimpleCodeEditor;

const CodeEditorView = React.forwardRef<ReactSimpleCodeEditorRef, ICodeEditorProps & { className: string }>(
  (props, ref) => {
    const { className, language, onChange = noop, value } = props;

    const highlightCodeCallback = useCallback(() => highlightCode(value, language), [value, language]);

    return (
      <div className={className}>
        <ReactSimpleCodeEditor
          ref={ref}
          value={value}
          onValueChange={onChange}
          highlight={highlightCodeCallback}
          padding={10}
        />
      </div>
    );
  }
);

// @ts-ignore
export const CodeEditor = styled<ICodeEditorProps>(CodeEditorView as any)`
  background: ${themeGet('components.codeEditor.bg')};
  border: 1px solid ${themeGet('components.codeEditor.border')};
  font-family: monospace;

  textarea {
    &:focus {
      outline: none;
    }
  }

  .namespace {
    opacity: 0.7;
  }

  .token {
    &.comment,
    &.prolog,
    &.doctype,
    &.cdata {
      color: ${themeGet('components.codeEditor.syntax.comment')};
    }

    &.punctuation {
      color: #9e9e9e;
    }

    &.property,
    &.tag,
    &.boolean,
    &.number,
    &.symbol,
    &.deleted {
      color: ${themeGet('components.codeEditor.syntax.primary')};
    }

    &.selector,
    &.attr-name,
    &.string,
    &.char,
    &.builtin,
    &.inserted {
      color: ${themeGet('components.codeEditor.syntax.secondary')};
    }

    &.operator,
    &.entity,
    &.url {
      color: ${themeGet('components.codeEditor.syntax.operator')};
    }

    &.atrule,
    &.attr-value,
    &.keyword {
      color: ${themeGet('components.codeEditor.syntax.keyword')};
    }

    &.function {
      color: ${themeGet('components.codeEditor.syntax.function')};
    }

    &.variable {
      color: ${themeGet('components.codeEditor.syntax.variable')};
    }

    &.regex,
    &.important {
      color: ${themeGet('components.codeEditor.syntax.regex')};
    }

    &.important,
    &.bold {
      font-weight: bold;
    }

    &.italic {
      font-style: italic;
    }

    &.entity {
      cursor: help;
    }
  }
`;
