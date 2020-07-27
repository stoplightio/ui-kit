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

class Observer extends Set<number> {
  handlers = new Map<number, Function>();

  addHandler(item: number, cb: Function) {
    this.handlers.set(item, cb);

    return () => {
      this.handlers.delete(item);
    };
  }

  addItem(item: number) {
    if (super.has(item)) return;

    super.add(item);
    this.handlers.get(item)?.();
  }
}

const SINGLE_BLOCK_SIZE = 24;

// todo: showLineNumbers does not work as it uses css counter, I guess we shall stick to array indices
const CodeViewer: React.FunctionComponent<ICodeViewerProps> = ({
  language,
  value,
  showLineNumbers = false,
  inline = false,
  className,
  ...rest
}) => {
  const lang = (language && languageMaps[language]) || language;

  // todo: window resize handler?
  const maxBlocks = React.useRef(Math.floor(window.innerHeight / SINGLE_BLOCK_SIZE) + 10);
  const observerRef = React.useRef(new Observer());

  React.useEffect(() => {
    const handler: EventListener = debounce(() => {
      const value = window.pageYOffset / (SINGLE_BLOCK_SIZE * maxBlocks.current);
      const blockNo = Math.round(value);

      observerRef.current.addItem(blockNo);

      if (value > blockNo) {
        observerRef.current.addItem(blockNo + 1);
      } else {
        observerRef.current.addItem(blockNo - 1);
      }
    }, 50);

    observerRef.current.addItem(0);

    // todo: won't work overflow on root
    window.addEventListener('scroll', handler, { passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [observerRef]);

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
      {...rest}
    >
      {blocks?.map((value, index) => (
        <Block
          key={index}
          value={value}
          language={language}
          showLineNumbers={showLineNumbers}
          index={index}
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
  index: number;
  observer: Observer;
}

const Block: React.FC<IBlockProps> = ({ value, language, showLineNumbers, index, observer }) => {
  const [markup, setMarkup] = React.useState<ReactNode[]>();
  const [isVisible, setIsVisible] = React.useState(index === 0); // the assumption is that we always start with scrollTop = 0

  React.useEffect(() => {
    return observer.addHandler(index, () => {
      setIsVisible(true);
    });
  }, [observer, index, setIsVisible]);

  React.useEffect(() => {
    if (isVisible) {
      setMarkup(parseCode(value, language, showLineNumbers).map(astToReact()));
    }
  }, [isVisible, value, language, showLineNumbers]);

  if (markup !== void 0) {
    return markup as any;
  }

  return value;
};

/**
 * EXPORTS
 */

export { CodeViewer as default, ICodeViewerProps };
