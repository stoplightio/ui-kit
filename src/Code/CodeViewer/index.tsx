import * as cn from 'classnames';
import * as React from 'react';

import { Classes } from '../../classes';
import { astToReact } from './utils/astToReact';
import { parseCode } from './utils/parseCode';

const languageMaps: { [from: string]: string } = {
  md: 'markdown',
};

/**
 * CODE VIEWER
 */
interface ICodeViewerProps extends React.HTMLAttributes<HTMLPreElement> {
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
  const lang = (language && languageMaps[language]) || language;

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

  const markup = parseCode(value, lang, showLineNumbers);

  return (
    <pre
      className={cn(Classes.CODE_EDITOR, className, `language-${lang || 'unknown'}`, {
        isInline: inline,
        showLineNumbers,
      })}
      {...rest}
    >
      {markup ? markup.map(astToReact()) : value}
    </pre>
  );
};

/**
 * EXPORTS
 */

export { CodeViewer, ICodeViewerProps };
