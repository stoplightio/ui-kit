import * as cn from 'classnames';
import { debounce } from 'lodash';
import * as React from 'react';
import useResizeObserver from 'use-resize-observer';

import { Classes } from '../../../classes';
import { SINGLE_LINE_SIZE } from './consts';
import { useSlicedBlocks } from './hooks/useSlicedBlocks';
import { ObservableSet } from './ObservableSet';
import { SingleCodeBlock } from './SingleCodeBlock';

export interface IBlockCodeViewerProps extends React.HTMLAttributes<HTMLPreElement> {
  value: string;
  language: string | undefined;
  showLineNumbers: boolean;
}

function calculateMaxLines(height: number) {
  return Math.floor(Math.min(window.innerHeight, height) / SINGLE_LINE_SIZE) + 1;
}

const BlockCodeViewer: React.FC<IBlockCodeViewerProps> = ({ className, language, value, showLineNumbers, ...rest }) => {
  const nodeRef = React.useRef<HTMLPreElement | null>(null);
  const [maxLines, setMaxLines] = React.useState<number | null>(null);
  const observerRef = React.useRef(new ObservableSet());
  const slicedBlocks = useSlicedBlocks(value, maxLines === null ? null : Math.max(0, maxLines - 1));
  const lineNumberCharacterCount = String(
    slicedBlocks !== null && maxLines !== null ? slicedBlocks.length * maxLines : 0,
  ).length;

  React.useLayoutEffect(() => {
    if (nodeRef.current !== null) {
      setMaxLines(calculateMaxLines(window.innerHeight)); // we have to use window here, as element may not ave any height at this time
      highlightRelevantParts(nodeRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeRef]);

  useResizeObserver({
    onResize: debounce(({ height }) => {
      const newMaxLines = calculateMaxLines(height);
      if (newMaxLines !== maxLines) {
        setMaxLines(newMaxLines);
      }
    }, 250),
    ref: nodeRef,
  });

  function highlightRelevantParts(target: EventTarget) {
    if (slicedBlocks === null || maxLines === null) return;

    const value =
      (target === nodeRef.current ? nodeRef.current.scrollTop : window.pageYOffset) /
      (SINGLE_LINE_SIZE * maxLines - SINGLE_LINE_SIZE);
    const blockNo = Math.round(value);

    // see https://github.com/stoplightio/ui-kit/pull/180 for the reasoning
    observerRef.current.add(blockNo);
    observerRef.current.add(Math.min(slicedBlocks.length - 1, blockNo + 1));
    observerRef.current.add(Math.max(0, blockNo - 1));

    if (value > blockNo) {
      observerRef.current.add(Math.min(slicedBlocks.length - 1, blockNo + 2));
    } else {
      observerRef.current.add(Math.max(0, blockNo - 2));
    }
  }

  React.useEffect(() => {
    observerRef.current.clear();
  }, [maxLines]);

  React.useEffect(() => {
    const { current: root } = nodeRef;

    if (root === null || maxLines === null) return;

    const handler: EventListener = debounce(e => {
      if (e.target !== null) {
        highlightRelevantParts(e.target);
      }
    }, 32);

    highlightRelevantParts(root.offsetHeight > window.innerHeight ? window : root);

    window.addEventListener('scroll', handler, { passive: true });
    root.addEventListener('scroll', handler, { passive: true });

    return () => {
      root.removeEventListener('scroll', handler);
      window.removeEventListener('scroll', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerRef, nodeRef, maxLines]);

  return (
    <pre
      ref={nodeRef}
      className={cn(Classes.CODE_VIEWER, className, `language-${language || 'unknown'}`, {
        [`${Classes.CODE_VIEWER}--line-numbers ${Classes.CODE_VIEWER}--line-numbers--${lineNumberCharacterCount}`]: showLineNumbers,
      })}
      {...rest}
    >
      {slicedBlocks?.map((value, index) => (
        <SingleCodeBlock
          key={index}
          value={value}
          language={language}
          showLineNumbers={showLineNumbers}
          index={index}
          lineNumber={maxLines === null ? 0 : (slicedBlocks.linesMap.get(index - 1) ?? 0) + 1}
          observer={observerRef.current}
        />
      ))}
    </pre>
  );
};

export { BlockCodeViewer as default };
