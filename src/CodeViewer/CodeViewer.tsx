import * as cn from 'classnames';
import * as React from 'react';
import { RefractorNode } from 'refractor/core';

import { Classes } from '../classes';
import { astToReact } from './utils/astToReact';
import CodeWorker from './worker';
import { isParseCodeResponseMessage } from './worker/messages';

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
  const [currentWorker, setCurrentWorker] = React.useState<Worker | null>(null);
  const [markup, setMarkup] = React.useState<RefractorNode[] | null>(null);

  React.useEffect(() => {
    if (currentWorker === null) return;

    currentWorker.onmessage = e => {
      if (isParseCodeResponseMessage(e) && e.data.nodes !== null) {
        setMarkup(e.data.nodes);
      }
    };

    return () => {
      currentWorker.onmessage = null;
    };
  }, [currentWorker]);

  React.useEffect(() => {
    const worker = new CodeWorker(); // todo: is nodejs integration turned off yet?
    setCurrentWorker(worker);

    if (!inline) {
      worker.postMessage({
        code: value,
        language: lang,
        showLineNumbers: true, // true due to react-window
      });
    }

    return () => {
      worker.terminate();
      setCurrentWorker(null);
    };
  }, [value, lang, inline]);

  if (inline) {
    return (
      <code
        className={cn(Classes.CODE_EDITOR, className, {
          [`${Classes.CODE_EDITOR}--inline`]: inline,
          [`${Classes.CODE_EDITOR}--line-numbers`]: showLineNumbers,
        })}
        {...rest}
      >
        {value}
      </code>
    );
  }

  return (
    <pre
      className={cn(Classes.CODE_EDITOR, className, `language-${lang || 'unknown'}`, {
        [`${Classes.CODE_EDITOR}--inline`]: inline,
        [`${Classes.CODE_EDITOR}--line-numbers`]: showLineNumbers,
      })}
      {...rest}
    >
      {markup === null ? value : markup.map(astToReact())}
    </pre>
  );
};

/**
 * EXPORTS
 */

export { CodeViewer as default, ICodeViewerProps };
