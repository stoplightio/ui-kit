import noop = require('lodash/noop');
import { highlight, languages } from 'prismjs';
import 'prismjs/components/';
import * as React from 'react';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

export interface ICodeEditorProps {
  defaultValue?: string;
  value?: string;
  language: string;
  onChange?: (code: string) => any;
  style?: object;
}

const CodeEditorView = (props: ICodeEditorProps & { className: string }) => {
  const { className, defaultValue, language, onChange = noop, style } = props;
  let { value } = props;

  let setValue: undefined | Function;

  if (value === undefined) {
    [value, setValue] = React.useState(defaultValue || '');
  }

  const handleChange = (newValue: string) => {
    if (setValue !== undefined) {
      setValue(newValue);
    }

    onChange(newValue);
  };

  return (
    <div className={className}>
      <Editor
        value={value}
        onValueChange={handleChange}
        highlight={(currentCode: string) => highlight(currentCode, languages[language])}
        padding={10}
        style={style}
      />
    </div>
  );
};

// @ts-ignore
export const CodeEditor = styled<ICodeEditorProps>(CodeEditorView as any)`
  background: ${themeGet('components.codeEditor.bg', '#fff')};
  border: 1px solid ${themeGet('components.codeEditor.border', '#000')};

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
      color: ${themeGet('components.codeEditor.syntax.comment', '#90a4ae')};
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
      color: ${themeGet('components.codeEditor.syntax.primary', '#e91e63')};
    }

    &.selector,
    &.attr-name,
    &.string,
    &.char,
    &.builtin,
    &.inserted {
      color: ${themeGet('components.codeEditor.syntax.secondary', '#4caf50')};
    }

    &.operator,
    &.entity,
    &.url {
      color: ${themeGet('components.codeEditor.syntax.operator', '#795548')};
    }

    &.atrule,
    &.attr-value,
    &.keyword {
      color: ${themeGet('components.codeEditor.syntax.keyword', '#3f51b5')};
    }

    &.function {
      color: ${themeGet('components.codeEditor.syntax.function', '#f44336')};
    }

    &.variable {
      color: ${themeGet('components.codeEditor.syntax.variable', '#ff9800')};
    }

    &.regex,
    &.important {
      color: ${themeGet('components.codeEditor.syntax.regex', '#ff9800')};
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
