import 'prismjs';

import * as cn from 'classnames';
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

  const code = React.useMemo(() => highlightCode(value, lang, showLineNumbers), [value, lang, showLineNumbers]);

  if (inline) {
    return (
      <code
        className={cn(Classes.CODE_EDITOR, className, {
          [`${Classes.CODE_EDITOR}--inline`]: inline,
          [`${Classes.CODE_EDITOR}--line-numbers`]: showLineNumbers,
        })}
        {...rest}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    );
  }

  return (
    <pre
      className={cn(Classes.CODE_EDITOR, className, `language-${lang || 'unknown'}`, {
        [`${Classes.CODE_EDITOR}--inline`]: inline,
        [`${Classes.CODE_EDITOR}--line-numbers`]: showLineNumbers,
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
