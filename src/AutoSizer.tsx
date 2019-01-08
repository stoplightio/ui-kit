/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { FunctionComponent, ReactNode } from 'react';
// @ts-ignore
import useResizeObserver from 'use-resize-observer';

import { Box, IBox } from './Box';

export interface IAutoSizerProps {
  children: ({ width, height }: { width: string; height: string }) => ReactNode;
}

export interface IAutoSizer extends IAutoSizerProps, Omit<IBox, 'children'> {}

export const AutoSizer: FunctionComponent<IAutoSizer> = props => {
  const { children, ...rest } = props;
  const [ref, width = '100%', height = '100%'] = useResizeObserver();

  return (
    <Box ref={ref} {...rest}>
      {children({ width, height })}
    </Box>
  );
};
