import { css } from '@emotion/core';
import * as React from 'react';

import noop = require('lodash/noop');
import 'prismjs/components/';
import ReactSimpleCodeEditor from 'react-simple-code-editor';

import { Box } from './Box';
import { useTheme } from './theme';
import { highlightCode } from './utils/highlightCode';

export interface ICodeEditor {
  value: string;
  language: string;
  onChange?: (code: string) => any;
  style?: React.CSSProperties;
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

export const CodeEditor = React.forwardRef<HTMLDivElement, ICodeEditor>((props, ref) => {
  const { language, onChange = noop, style, value } = props;
  const highlightCodeCallback = React.useCallback(() => highlightCode(value, language), [value, language]);

  return (
    <Box style={style} css={codeEditorStyles()}>
      <ReactSimpleCodeEditor
        // @ts-ignore FIXME type erorr
        ref={ref}
        value={value}
        onValueChange={onChange}
        highlight={highlightCodeCallback}
        padding={10}
      />
    </Box>
  );
});

export const codeEditorStyles = () => {
  const { codeEditor } = useTheme();

  return [
    {
      background: codeEditor.bg,
      border: codeEditor.border ? `1px solid ${codeEditor.border}` : undefined,
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
          color: ${codeEditor.syntax.comment};
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
          color: ${codeEditor.syntax.primary};
        }

        &.selector,
        &.attr-name,
        &.string,
        &.char,
        &.builtin,
        &.inserted {
          color: ${codeEditor.syntax.secondary};
        }

        &.operator,
        &.entity,
        &.url {
          color: ${codeEditor.syntax.operator};
        }

        &.atrule,
        &.attr-value,
        &.keyword {
          color: ${codeEditor.syntax.keyword};
        }

        &.function {
          color: ${codeEditor.syntax.function};
        }

        &.variable {
          color: ${codeEditor.syntax.variable};
        }

        &.regex,
        &.important {
          color: ${codeEditor.syntax.regex};
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
