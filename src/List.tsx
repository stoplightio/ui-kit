import { Omit } from '@stoplight/types';
import * as React from 'react';

import { Box, IBox } from './Box';
import * as sl from './styles';

export interface IList extends sl.IListStyleProps, Omit<IBox<HTMLUListElement | HTMLOListElement>, 'as'> {
  as?: 'ul' | 'ol';
}

export const List = React.forwardRef<HTMLOrSVGElement, IList>((props, ref) => {
  const { as = 'ul', listStyle, listStylePosition, ...rest } = props;

  return <Box {...rest} as={as} ref={ref} css={listStyles({ listStyle, listStylePosition })} />;
});

export const listStyles = ({ listStyle, listStylePosition }: IList) => {
  return sl.listStyle({ listStyle, listStylePosition });
};
