import * as React from 'react';
import type { RefractorNode } from 'refractor/core';

import { astToReact } from '../../utils/astToReact';
import { lineNumberify } from '../../utils/lineNumberify';
import { parseCode } from '../../utils/parseCode';
import type { ObservableSet } from './ObservableSet';

interface IBlockProps {
  value: string;
  language: string | undefined;
  showLineNumbers: boolean;
  lineNumber: number;
  observer: IntersectionObserver | undefined;
  viewport: ObservableSet;
}

const WHITESPACE_REGEX = /^[\s\n]+$/;

function isWhitespace(str: string) {
  return WHITESPACE_REGEX.test(str);
}

function isTrailingWhiteLine(node: RefractorNode) {
  if (node.type === 'text') {
    return isWhitespace(node.value);
  }

  if ('children' in node && node.children.length === 1 && 'value' in node.children[0]) {
    return isWhitespace(node.children[0].value);
  }

  return false;
}

export const SingleCodeBlock: React.FC<IBlockProps> = ({
  value,
  language,
  showLineNumbers,
  lineNumber,
  observer,
  viewport,
}) => {
  const [markup, setMarkup] = React.useState<React.ReactNode[]>();
  const [isVisible, setIsVisible] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const { current: node } = nodeRef;

    if (node === null || observer === void 0) {
      return;
    }

    observer.observe(node);

    const removeListener = viewport.addListener(node, () => {
      setIsVisible(true);
      observer.unobserve(node);
    });

    return () => {
      observer.unobserve(node);
      removeListener();
    };
  }, [viewport, observer, nodeRef]);

  React.useEffect(() => {
    if (isVisible) {
      try {
        const tree = parseCode(value, language);
        const processedTree = showLineNumbers ? lineNumberify(tree, lineNumber - 1) : tree;

        if (showLineNumbers && tree.length > 0 && isTrailingWhiteLine(tree[tree.length - 1])) {
          // this is to get rid of trailing new lines
          processedTree.pop();
        }

        setMarkup(processedTree.map(astToReact(0)));
      } catch {
        // parsing failed for some reason, let's display regular text
      }
    }
  }, [isVisible, lineNumber, value, language, showLineNumbers]);

  if (markup !== void 0) {
    return <>{markup}</>;
  }

  return <div ref={nodeRef}>{value}</div>;
};
