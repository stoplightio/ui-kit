/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { FunctionComponent } from 'react';

import { IText, Text } from './Text';

export interface IHeading extends Omit<IText<HTMLHeadingElement>, 'as'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: FunctionComponent<IHeading> = props => {
  const { as = 'h2', ...rest } = props;

  return <Text {...rest} as={as} defaultCSS={headingStyles()} />;
};

const headingStyles = () => ({ magin: '0', fontWeight: 900 });
