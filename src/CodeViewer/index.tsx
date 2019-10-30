import * as cn from 'classnames';
import 'prismjs';
import * as React from 'react';

import { Classes } from '../classes';
import { highlightCode } from '../CodeEditor/utils/highlightCode';

const languageMaps: { [from: string]: string } = {
  md: 'markdown',
};

/**
 * CODE VIEWER
 */
interface ICodeViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  language?: string;
  showLineNumbers?: boolean;
  inline?: boolean;
}

const CodeViewer: React.FunctionComponent<ICodeViewerProps> = ({
  language,
  value,
  showLineNumbers = false,
  inline = false,
  className,
  ...rest
}) => {
  const lang = (language && languageMaps[language]) || language || '';

  if (inline) {
    return (
      <code
        className={cn(Classes.CODE_EDITOR, className, {
          isInline: inline,
          showLineNumbers,
        })}
        {...rest}
      >
        {value}
      </code>
    );
  }

  const code = highlightCode(value, lang, showLineNumbers);

  return (
    <pre
      className={cn(Classes.CODE_EDITOR, className, `language-${lang || 'unknown'}`, {
        isInline: inline,
      })}
      {...(rest as React.HTMLAttributes<HTMLPreElement>)}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
};

/**
 * EXPORTS
 */

export { CodeViewer, ICodeViewerProps };
