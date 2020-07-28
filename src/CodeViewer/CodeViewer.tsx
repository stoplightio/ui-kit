import * as cn from 'classnames';
import { debounce } from 'lodash';
import * as React from 'react';
import { ReactNode } from 'react';

import { Classes } from '../classes';
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

class ObservableSet extends Set<number> {
  private readonly listeners = new Map<number, Function>();

  addListener(item: number, cb: Function) {
    this.listeners.set(item, cb);

    return () => {
      this.listeners.delete(item);
    };
  }

  add(item: number) {
    if (super.has(item)) return this;

    super.add(item);
    this.listeners.get(item)?.();
    return this;
  }
}

const SINGLE_BLOCK_SIZE = 24;

const CodeViewer: React.FunctionComponent<ICodeViewerProps> = ({
  language,
  value,
  showLineNumbers = false,
  inline = false,
  className,
  ...rest
}) => {
  const lang = (language && languageMaps[language]) || language;

  // todo: window resize handler? use container size?
  const maxBlocks = React.useRef(Math.floor(window.innerHeight / SINGLE_BLOCK_SIZE) + 10);
  const observerRef = React.useRef(new ObservableSet());

  React.useEffect(() => {
    const handler: EventListener = debounce(() => {
      const value = window.pageYOffset / (SINGLE_BLOCK_SIZE * maxBlocks.current);
      const blockNo = Math.round(value);

      observerRef.current.add(blockNo);

      if (value > blockNo) {
        observerRef.current.add(blockNo + 1);
      } else {
        observerRef.current.add(blockNo - 1);
      }
    }, 50);

    observerRef.current.add(0);

    // todo: won't work overflow on root
    window.addEventListener('scroll', handler, { passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [observerRef]);

  const handleScroll = () => {
    // console.log('scroll');
  };

  const blocks = React.useMemo<string[] | null>(() => {
    if (inline) {
      return null;
    }

    const blocks: string[] = [''];

    for (let i = 0, n = 0; i < value.length; i++) {
      const char = value[i];
      blocks[blocks.length - 1] += char;

      if (char === '\n') {
        n++;

        if (n % maxBlocks.current === 0 && i + 1 !== value.length) {
          blocks.push('');
        }
      }
    }

    return blocks;
  }, [inline, value]);

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
      onScroll={handleScroll}
      {...rest}
    >
      {blocks?.map((value, index) => (
        <Block
          key={index}
          value={value}
          language={language}
          showLineNumbers={showLineNumbers}
          index={index}
          lineNumber={index * maxBlocks.current + 1}
          observer={observerRef.current}
        />
      ))}
    </pre>
  );
};

interface IBlockProps {
  value: string;
  language: string | undefined;
  showLineNumbers: boolean;
  lineNumber: number;
  index: number;
  observer: ObservableSet;
}

const Block: React.FC<IBlockProps> = ({ value, language, showLineNumbers, index, lineNumber, observer }) => {
  const [markup, setMarkup] = React.useState<ReactNode[]>();
  const [isVisible, setIsVisible] = React.useState(index === 0); // the assumption is that we always start with scrollTop = 0

  React.useEffect(() => {
    return observer.addListener(index, () => {
      setIsVisible(true);
    });
  }, [observer, index, setIsVisible]);

  React.useEffect(() => {
    if (isVisible) {
      setMarkup(parseCode(value, language, showLineNumbers).map(astToReact(lineNumber)));
    }
  }, [isVisible, lineNumber, value, language, showLineNumbers]);

  if (markup !== void 0) {
    return markup as any;
  }

  return value;
};

/**
 * EXPORTS
 */

export { CodeViewer as default, ICodeViewerProps };
