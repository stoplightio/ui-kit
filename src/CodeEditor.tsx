import noop = require('lodash/noop');
import 'prismjs/components/';
import * as React from 'react';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';
import { useControllableValue } from './hooks/useControllableValue';
import { themeGet } from './utils';
import { highlightCode } from './utils/highlightCode';
import { useCallback } from 'react';

export interface ICodeEditorProps {
  value?: string;
  language: string;
  onChange?: (code: string) => any;
}

const CodeEditorView = (props: ICodeEditorProps & { className: string }) => {
  const { className, language, onChange = noop } = props;

  const [value, setValue] = useControllableValue(props.value);

  const highlightCodeCallback = useCallback(() => highlightCode(value, language), [value, language]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={className}>
      <Editor
        value={value}
        onValueChange={handleChange}
        highlight={highlightCodeCallback}
        padding={10}
      />
    </div>
  );
};

// @ts-ignore
export const CodeEditor = styled<ICodeEditorProps>(CodeEditorView as any)`
  background: ${themeGet('components.codeEditor.bg')};
  border: 1px solid ${themeGet('components.codeEditor.border')};

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
