import * as React from 'react';
import { Box, IBox } from '../Box';
import { codeStyles } from './styles';
import { astToReact } from './utils/astToReact';
import { parseCode } from './utils/parseCode';

export interface IViewer extends IBox {
  value: string;
  language?: string;
  // todo: implement me
  // showLineNumbers?: boolean;
  // inline?: boolean;
}

export const Viewer: React.FunctionComponent<IViewer> = ({ language, value, ...rest }) => {
  const markup = parseCode(value, language);

  return (
    <Box {...rest} as="pre" css={codeStyles()}>
      {markup ? markup.map(astToReact()) : value}
    </Box>
  );
};
