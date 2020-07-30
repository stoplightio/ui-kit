import * as React from 'react';
import { ReactNode } from 'react';

import { astToReact } from '../../utils/astToReact';
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
  const [markup, setMarkup] = React.useState<ReactNode[]>();
  const [isVisible, setIsVisible] = React.useState(index === 0); // the assumption is that we always start with scrollTop = 0

  React.useEffect(() => {
    return observer.addListener(index, () => {
      setIsVisible(true);
    });
  }, [observer, index, setIsVisible]);

  React.useEffect(() => {
    if (isVisible) {
      try {
        setMarkup(parseCode(value, language, showLineNumbers).map(astToReact(lineNumber)));
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
