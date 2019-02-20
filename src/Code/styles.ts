import { css } from '@emotion/core';
import { useTheme } from '../theme';

export interface ICodeStyles {
  inline?: boolean;
}

export const codeStyles = ({ inline }: ICodeStyles = {}) => {
  const { code } = useTheme();

  if (inline) {
    return [
      {
        background: code.inlineBg,
        color: code.inlineFg,
        padding: 4,
        borderRadius: '2px',
      },
    ];
  }

  return [
    {
      background: code.bg,
      ...(code.border && { border: `1px solid ${code.border}` }),
      fontFamily: 'monospace',
      padding: 10,
    },
    css`
      counter-reset: line;

      .namespace {
        opacity: 0.7;
      }

      .line-number {
        padding-right: 10px;

        &::before {
          content: '';
          display: inline-block;
          user-select: none;
          opacity: 0.3;
          text-align: right;
          min-width: 25px;
          padding-right: 15px;
          counter-increment: line;
          content: counter(line);
        }
      }

      .token {
        &.comment,
        &.prolog,
        &.doctype,
        &.cdata {
          color: ${code.syntax.comment};
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
          color: ${code.syntax.primary};
        }

        &.selector,
        &.attr-name,
        &.string,
        &.char,
        &.builtin,
        &.inserted {
          color: ${code.syntax.secondary};
        }

        &.operator,
        &.entity,
        &.url {
          color: ${code.syntax.operator};
        }

        &.atrule,
        &.attr-value,
        &.keyword {
          color: ${code.syntax.keyword};
        }

        &.function {
          color: ${code.syntax.function};
        }

        &.variable {
          color: ${code.syntax.variable};
        }

        &.regex,
        &.important {
          color: ${code.syntax.regex};
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
