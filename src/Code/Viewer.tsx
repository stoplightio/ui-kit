import * as React from 'react';
import { Box, IBox } from '../Box';
import { codeStyles } from './styles';
import { astToReact } from './utils/astToReact';
import { parseCode } from './utils/parseCode';

export interface IViewer extends IBox {
  value: string;
  language?: string;
  showLineNumbers?: boolean;
  inline?: boolean;
}

export const Viewer: React.FunctionComponent<IViewer> = ({ language, value, showLineNumbers, inline, ...rest }) => {
  const css = codeStyles({ inline });

  if (inline) {
    return (
      <Box {...rest} css={css} as="code">
        {value}
      </Box>
    );
  }

  const markup = parseCode(value, language);

  return (
    <Box {...rest} as="pre" css={css}>
      {markup ? markup.map(astToReact()) : value}
    </Box>
  );
};
