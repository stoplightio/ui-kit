import cn from 'classnames';
import * as React from 'react';

import { Classes } from '../../../classes';
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
  const maxLines = 100;
  const [observer, setObserver] = React.useState<IntersectionObserver>();
  const viewportSet = React.useRef(new ObservableSet());
  const slicedBlocks = useSlicedBlocks(value ?? '', maxLines - 1);
  const lineNumberCharacterCount = String(slicedBlocks.length * maxLines).length;

  React.useEffect(() => {
    const { current: viewport } = viewportSet;
    if (nodeRef.current === null) {
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
  }, [nodeRef]);

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
