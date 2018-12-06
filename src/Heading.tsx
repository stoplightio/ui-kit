/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { IText, Text } from './Text';

export const Heading: FunctionComponent<IHeading> = props => {
  const { as = 'h2', m = '0', fontWeight = 'bold', ...rest } = props;

  return jsx(Text, {
    ...rest,
    m,
    fontWeight,
    as,
  });
};

export interface IHeading
  extends IHeadingProps,
    Pick<IText<HTMLHeadingElement>, Exclude<keyof IText<HTMLHeadingElement>, 'as'>> {}

export interface IHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
