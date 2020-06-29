import * as cn from 'classnames';
import * as React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { RefractorNode } from 'refractor/core';
import CodeWorker from 'worker-loader!./worker/index.ts';

import { AutoSizer } from '../AutoSizer';
import { Classes } from '../classes';
import { mapChild } from './utils/astToReact';
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
      if (isParseCodeResponseMessage(e)) {
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

  const actualClassName = cn(Classes.CODE_EDITOR, className, `language-${lang || 'unknown'}`, {
    [`${Classes.CODE_EDITOR}--inline`]: inline,
    [`${Classes.CODE_EDITOR}--line-numbers`]: showLineNumbers,
  });

  if (markup === null) {
    return (
      <pre className={actualClassName} {...rest}>
        {value}
      </pre>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          itemCount={markup.length}
          className={actualClassName}
          innerTagName="pre"
          itemSize={24}
          width={width}
          height={height}
          itemData={markup}
        >
          {CodeLine}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

const CodeLine: React.FC<ListChildComponentProps> = ({ index, style, data }) => {
  const line = mapChild(data[index], index, 0, {
    style,
    'data-line': index + 1,
  });

  if (line === null || typeof line !== 'object') {
    return <span>{line}</span>;
  }

  return line as React.ReactElement;
};

/**
 * EXPORTS
 */

export { CodeViewer, ICodeViewerProps };
