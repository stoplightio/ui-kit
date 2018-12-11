/* @jsx jsx */

import { css, jsx } from '@emotion/core';
import noop = require('lodash/noop');
import 'prismjs/components/';
import { CSSProperties, forwardRef, useCallback } from 'react';
import ReactSimpleCodeEditor from 'react-simple-code-editor';

import { Box } from './Box';
import { useTheme } from './theme';
import { highlightCode } from './utils/highlightCode';

export interface ICodeEditor {
  value: string;
  language: string;
  onChange?: (code: string) => any;
  style?: CSSProperties;
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

export const CodeEditor = forwardRef<HTMLDivElement, ICodeEditor>((props, ref) => {
  const { language, onChange = noop, style, value } = props;
  const highlightCodeCallback = useCallback(() => highlightCode(value, language), [value, language]);
  const editorCSS = [...codeEditorStyles()];

  return jsx(
    Box,
    {
      style,
      css: editorCSS,
    },
    jsx(ReactSimpleCodeEditor, {
      ref,
      value,
      onValueChange: onChange,
      highlight: highlightCodeCallback,
      padding: 10,
    })
  );
});

export const codeEditorStyles = () => {
  const theme = useTheme();

  return [
    {
      background: theme.codeEditor.bg,
      border: `1px solid ${theme.codeEditor.border}`,
      fontFamily: 'monospace',
    },
    css`
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
          color: ${theme.codeEditor.syntax.comment};
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
          color: ${theme.codeEditor.syntax.primary};
        }

        &.selector,
        &.attr-name,
        &.string,
        &.char,
        &.builtin,
        &.inserted {
          color: ${theme.codeEditor.syntax.secondary};
        }

        &.operator,
        &.entity,
        &.url {
          color: ${theme.codeEditor.syntax.operator};
        }

        &.atrule,
        &.attr-value,
        &.keyword {
          color: ${theme.codeEditor.syntax.keyword};
        }

        &.function {
          color: ${theme.codeEditor.syntax.function};
        }

        &.variable {
          color: ${theme.codeEditor.syntax.variable};
        }

        &.regex,
        &.important {
          color: ${theme.codeEditor.syntax.regex};
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
    `,
  ];
};
