import * as React from 'react';

import { astToReact } from '../../utils/astToReact';
import { lineNumberify } from '../../utils/lineNumberify';
import { parseCode } from '../../utils/parseCode';
import type { ObservableSet } from './ObservableSet';

interface IBlockProps {
  value: string;
  language: string | undefined;
  showLineNumbers: boolean;
  lineNumber: number;
  index: number;
  observer: ObservableSet;
}

export const SingleCodeBlock: React.FC<IBlockProps> = ({
  value,
  language,
  showLineNumbers,
  index,
  lineNumber,
  observer,
}) => {
  const [markup, setMarkup] = React.useState<React.ReactNode[]>();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    return observer.addListener(index, () => {
      setIsVisible(true);
    });
  }, [observer, index, setIsVisible]);

  React.useEffect(() => {
    if (isVisible) {
      try {
        const tree = parseCode(value, language);
        const processedTree = showLineNumbers ? lineNumberify(tree, lineNumber - 1) : tree;

        if (tree.length > 0) {
          const lastTreeNode = tree[tree.length - 1];
          if (
            'children' in lastTreeNode &&
            lastTreeNode.children.length === 1 &&
            'value' in lastTreeNode.children[0] &&
            lastTreeNode.children[0].value === '\n'
          ) {
            // this is to get rid of trailing new lines
            processedTree.pop();
          }
        }

        setMarkup(processedTree.map(astToReact(0)));
      } catch {
        // parsing failed for some reason, let's display regular text
      }
    }
  }, [isVisible, lineNumber, value, language, showLineNumbers]);

  if (markup !== void 0) {
    return markup as any;
  }

  return value;
};
