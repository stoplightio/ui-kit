/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';

export interface IBreak extends IBox<HTMLHRElement | HTMLElement> {
  thickness?: number;
}

export const Break: FunctionComponent<IBreak> = props => {
  const { as = 'hr', m = '0 auto', thickness = 1, ...rest } = props;

  return jsx(Box, {
    ...rest,
    m,
    as,
    css: breakStyles({ thickness }),
  });
};

export const breakStyles = ({ thickness }: IBreak) => [
  {
    border: '0 none',
    borderTop: `${thickness}px solid`,
    height: 0,
    margin: 0,
  },
];
