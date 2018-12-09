/* @jsx jsx */

import { jsx } from '@emotion/core';

import { Box, IBox } from './Box';

export interface IMarkProps extends IBox {
  mark: any;
}

// todo: backport to slate?
export const Mark = (props: IMarkProps) => {
  switch (props.mark.type) {
    case 'strong':
      return (
        <Box as="strong" {...props}>
          {props.children}
        </Box>
      );

    case 'emphasis':
      return (
        <Box as="em" {...props}>
          {props.children}
        </Box>
      );

    case 'delete':
      return (
        <Box as="del" {...props}>
          {props.children}
        </Box>
      );

    case 'inlineCode':
      return (
        <Box as="code" {...props}>
          {props.children}
        </Box>
      );
  }

  return null;
};
