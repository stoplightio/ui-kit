import { Omit } from '@stoplight/types';
import * as React from 'react';
// @ts-ignore
import useResizeObserver from 'use-resize-observer';

import { Box, IBox } from './Box';

export interface IAutoSizer extends Omit<IBox, 'children'> {
  children: ({ width, height }: { width: string; height: string }) => React.ReactNode;
}

export const AutoSizer: React.FunctionComponent<IAutoSizer> = props => {
  const { children, ...rest } = props;
  const [ref, width = '100%', height = '100%'] = useResizeObserver();

  return (
    <Box ref={ref} {...rest}>
      {children({ width, height })}
    </Box>
  );
};
