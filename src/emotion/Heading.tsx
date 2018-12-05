/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';

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
    Pick<IText, Exclude<keyof IText, 'as'>>,
    HTMLAttributes<HTMLHeadingElement> {}

export interface IHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
