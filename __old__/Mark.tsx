import * as React from 'react';

import { Box, IBoxProps } from './Box';

export interface IMarkProps {
  attributes?: IBoxProps;
  children: any;
  mark: any;
}

export const Mark = (props: IMarkProps) => {
  switch (props.mark.type) {
    case 'strong':
      return (
        <Box as="strong" {...props.attributes}>
          {props.children}
        </Box>
      );

    case 'emphasis':
      return (
        <Box as="em" {...props.attributes}>
          {props.children}
        </Box>
      );

    case 'delete':
      return (
        <Box as="del" {...props.attributes}>
          {props.children}
        </Box>
      );

    case 'inlineCode':
      return (
        <Box as="code" {...props.attributes}>
          {props.children}
        </Box>
      );
  }

  return null;
};
