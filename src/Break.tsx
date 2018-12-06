/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';

export const Break: FunctionComponent<IBreak> = props => {
  const { as = 'hr', m = '0 auto', thickness = 1, ...rest } = props;

  const css = [...breakStyles({ thickness })];

  return jsx(Box, {
    ...rest,
    m,
    as,
    css,
  });
};

export interface IBreak extends IBreakProps, IBox<HTMLHRElement | HTMLElement> {}

export interface IBreakProps {
  thickness?: number;
}

export const breakStyles = ({ thickness }: IBreakProps) => [
  {
    borderTop: `${thickness}px solid`,
  },
];
