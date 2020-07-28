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

const BlockCodeViewer: React.FC<IBlockCodeViewerProps> = ({ className, language, value, showLineNumbers, ...rest }) => {
  const nodeRef = React.useRef<HTMLPreElement | null>(null);
  const [maxBlocks, setMaxBlocks] = React.useState<number | null>(null);
  const observerRef = React.useRef(new ObservableSet());
  const slicedBlocks = useSlicedBlocks(value, maxBlocks);

  React.useLayoutEffect(() => {
    if (nodeRef.current !== null) {
      setMaxBlocks(calculateHeight(nodeRef.current.offsetHeight));
      highlightRelevantParts(nodeRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeRef]);

  useResizeObserver({
    onResize: debounce(({ height }) => {
      const newMaxBlocks = calculateHeight(height);
      if (newMaxBlocks !== maxBlocks) {
        setMaxBlocks(newMaxBlocks);
      }
    }, 500),
    ref: nodeRef,
  });

  function calculateHeight(height: number) {
    return Math.floor(Math.min(window.innerHeight, height) / SINGLE_LINE_SIZE) + SINGLE_LINE_SIZE * 5;
  }

  function highlightRelevantParts(target: EventTarget) {
    if (slicedBlocks === null || maxBlocks === null) return;

    const value =
      (target === nodeRef.current ? nodeRef.current.scrollTop : window.pageYOffset) / (SINGLE_LINE_SIZE * maxBlocks);
    const blockNo = Math.round(value);

    observerRef.current.add(blockNo);

    if (value > blockNo) {
      observerRef.current.add(Math.min(slicedBlocks.length, blockNo + 1));
    } else {
      observerRef.current.add(Math.max(0, blockNo - 1));
    }
  }

  React.useEffect(() => {
    const { current: root } = nodeRef;

    if (root === null || maxBlocks === null) return;

    const handler: EventListener = debounce(e => {
      if (e.target !== null) {
        highlightRelevantParts(e.target);
      }
    }, 50);

    window.addEventListener('scroll', handler, { passive: true });
    root.addEventListener('scroll', handler, { passive: true });

    return () => {
      root.removeEventListener('scroll', handler);
      window.removeEventListener('scroll', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerRef, nodeRef, maxBlocks]);

  return (
    <pre
      ref={nodeRef}
      className={cn(Classes.CODE_EDITOR, className, `language-${language || 'unknown'}`, {
        [`${Classes.CODE_EDITOR}--line-numbers`]: showLineNumbers,
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
          lineNumber={maxBlocks === null ? 0 : index * maxBlocks + 1}
          observer={observerRef.current}
        />
      ))}
    </pre>
  );
};

export { BlockCodeViewer as default };
