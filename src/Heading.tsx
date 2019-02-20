import { Omit } from '@stoplight/types';
import * as React from 'react';

import { IText, Text } from './Text';

export interface IHeading extends Omit<IText<HTMLHeadingElement>, 'as'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, IHeading>((props, ref) => {
  const { as = 'h2', ...rest } = props;

  return <Text {...rest} as={as} ref={ref} css={headingStyles()} />;
});

const headingStyles = () => ({ magin: '0', fontWeight: 900 });
