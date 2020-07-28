import * as React from 'react';

import { BlockCodeViewer } from './components/BlockCodeViewer';
import { InlineCodeViewer } from './components/InlineCodeViewer';

const languageMaps: { [from: string]: string } = {
  md: 'markdown',
};

/**
 * CODE VIEWER
 */
interface ICodeViewerProps extends React.HTMLAttributes<HTMLElement> {
  value: string;
  language?: string;
  showLineNumbers?: boolean;
  inline?: boolean;
}

const CodeViewer: React.FunctionComponent<ICodeViewerProps> = ({
  language,
  value,
  showLineNumbers = false,
  inline = false,
  ...rest
}) => {
  if (inline) {
    return <InlineCodeViewer value={value} {...rest} />;
  }

  const lang = (language && languageMaps[language]) || language;
  return <BlockCodeViewer showLineNumbers={showLineNumbers} language={lang} value={value} {...rest} />;
};

/**
 * EXPORTS
 */

export { CodeViewer, ICodeViewerProps };
