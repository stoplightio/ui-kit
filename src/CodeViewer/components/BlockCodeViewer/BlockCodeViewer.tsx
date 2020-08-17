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
  const [observer, setObserver] = React.useState<IntersectionObserver>();
  const viewportSet = React.useRef(new ObservableSet());
  const slicedBlocks = useSlicedBlocks(value, maxLines === null ? null : Math.max(0, maxLines - 1));
  const lineNumberCharacterCount = String(
    slicedBlocks !== null && maxLines !== null ? slicedBlocks.length * maxLines : 0,
  ).length;

  React.useLayoutEffect(() => {
    if (nodeRef.current !== null) {
      setMaxLines(calculateMaxLines(window.innerHeight)); // we have to use window here, as element may not ave any height at this time
    }
  }, [nodeRef]);

  React.useEffect(() => {
    const { current: viewport } = viewportSet;
    if (nodeRef.current === null || maxLines === null) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          viewport.add(entry.target);
          const { previousElementSibling, nextElementSibling } = entry.target;

          // highlight siblings to reduce flickering while scrolling using page up/down
          if (previousElementSibling?.tagName === 'DIV') {
            viewport.add(previousElementSibling);
          }

          if (nextElementSibling?.tagName === 'DIV') {
            viewport.add(nextElementSibling);
          }
        }
      },
      {
        root: null,
        threshold: 0,
      },
    );

    setObserver(observer);

    return () => {
      setObserver(void 0);
      observer.disconnect();
    };
  }, [nodeRef, maxLines]);

  useResizeObserver({
    onResize: debounce(
      ({ height }) => {
        const newMaxLines = calculateMaxLines(height);
        if (newMaxLines !== maxLines) {
          setMaxLines(newMaxLines);
        }
      },
      250,
      { leading: true },
    ),
    ref: nodeRef,
  });

  return (
    <pre
      ref={nodeRef}
      className={cn(Classes.CODE_VIEWER, className, `language-${language || 'unknown'}`, {
        [`${Classes.CODE_VIEWER}--line-numbers ${Classes.CODE_VIEWER}--line-numbers--${lineNumberCharacterCount}`]: showLineNumbers,
      })}
      {...rest}
    >
      {slicedBlocks?.map(({ id, value }, index, blocks) => (
        <SingleCodeBlock
          key={id}
          value={value}
          language={language}
          showLineNumbers={showLineNumbers}
          lineNumber={(index > 0 ? blocks[index - 1].lineCount : 0) + 1}
          observer={observer}
          viewport={viewportSet.current}
        />
      ))}
    </pre>
  );
};

export { BlockCodeViewer as default };
