import { Omit } from '@stoplight/types';
import * as React from 'react';

import { IText, Text } from './Text';

export interface IHeading extends Omit<IText<HTMLHeadingElement>, 'as'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading: React.FunctionComponent<IHeading> = React.forwardRef<HTMLHeadingElement, IHeading>(function Heading(
  props,
  ref
) {
  const { as = 'h2', css, ...rest } = props;

  return <Text {...rest} as={as} ref={ref} css={[headingStyles(), css]} />;
});

Heading.displayName = ' Heading';

const headingStyles = () => ({ magin: '0', fontWeight: 900 });

export { Heading };
