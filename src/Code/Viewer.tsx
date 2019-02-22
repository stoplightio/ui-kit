import * as React from 'react';

import { Box, IBox } from '../Box';
import { codeStyles } from './styles';
import { astToReact } from './utils/astToReact';
import { parseCode } from './utils/parseCode';

const languageMaps: { [from: string]: string } = {
  md: 'markdown',
};

export interface IViewer extends IBox {
  value: string;
  language?: string;
  showLineNumbers?: boolean;
  inline?: boolean;
}

export const Viewer: React.FunctionComponent<IViewer> = ({
  language,
  value,
  showLineNumbers = false,
  inline = false,
  css,
  ...rest
}) => {
  const codeCss = codeStyles({ inline, showLineNumbers });
  const lang = (language && languageMaps[language]) || language;

  if (inline) {
    return (
      <Box {...rest} css={[codeCss, css]} as="code">
        {value}
      </Box>
    );
  }

  const markup = parseCode(value, lang, showLineNumbers);

  return (
    <Box {...rest} as="pre" css={[codeCss, css]}>
      {markup ? markup.map(astToReact()) : value}
    </Box>
  );
};
