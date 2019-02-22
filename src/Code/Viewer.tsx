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

export const Viewer: React.FunctionComponent<IViewer> = ({
  language,
  value,
  showLineNumbers = false,
  inline = false,
  css,
  ...rest
}) => {
  const codeCss = codeStyles({ inline });

  if (inline) {
    return (
      <Box {...rest} css={[codeCss, css]} as="code">
        {value}
      </Box>
    );
  }

  const markup = parseCode(value, language, showLineNumbers);

  return (
    <Box {...rest} as="pre" css={[codeCss, css]}>
      {markup ? markup.map(astToReact()) : value}
    </Box>
  );
};
