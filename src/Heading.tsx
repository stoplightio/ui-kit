/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { FunctionComponent } from 'react';

import { IText, Text } from './Text';

export interface IHeading extends Omit<IText<HTMLHeadingElement>, 'as'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: FunctionComponent<IHeading> = props => {
  const { as = 'h2', m = '0', fontWeight = 'bold', ...rest } = props;

  return jsx(Text, {
    ...rest,
    m,
    fontWeight,
    as,
  });
};
