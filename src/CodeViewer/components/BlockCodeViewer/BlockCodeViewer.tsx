import * as cn from 'classnames';
import { debounce } from 'lodash';
import * as React from 'react';
import useResizeObserver from 'use-resize-observer';

import { Classes } from '../../../classes';
import { LINES_OVER_SCAN, SINGLE_LINE_SIZE } from './consts';
import { useSlicedBlocks } from './hooks/useSlicedBlocks';
import { ObservableSet } from './ObservableSet';
import { SingleCodeBlock } from './SingleCodeBlock';

export interface IBlockCodeViewerProps extends React.HTMLAttributes<HTMLPreElement> {
  value: string;
  language: string | undefined;
  showLineNumbers: boolean;
}

const OVER_SCAN_HEIGHT = SINGLE_LINE_SIZE * LINES_OVER_SCAN;

function calculateMaxLines(height: number) {
  return Math.floor(Math.min(window.innerHeight, height) / SINGLE_LINE_SIZE) + 1 + OVER_SCAN_HEIGHT;
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
      ((target === nodeRef.current ? nodeRef.current.scrollTop : window.pageYOffset) - OVER_SCAN_HEIGHT / 2) /
      (SINGLE_LINE_SIZE * maxLines - SINGLE_LINE_SIZE);
    const blockNo = Math.round(value);

    observerRef.current.add(blockNo);

    if (value > blockNo && blockNo + 1 !== slicedBlocks.length) {
      observerRef.current.add(blockNo + 1);
    } else {
      observerRef.current.add(Math.max(0, blockNo - 1));
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
      className={cn(Classes.CODE_EDITOR, className, `language-${language || 'unknown'}`, {
        [`${Classes.CODE_EDITOR}--line-numbers ${Classes.CODE_EDITOR}--line-numbers--${lineNumberCharacterCount}`]: showLineNumbers,
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
          lineNumber={maxLines === null ? 0 : index * maxLines + 1}
          observer={observerRef.current}
        />
      ))}
    </pre>
  );
};

export { BlockCodeViewer as default };
