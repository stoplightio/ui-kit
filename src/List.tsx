import { Omit } from '@stoplight/types';
import * as React from 'react';

import { Box, IBox } from './Box';
import * as sl from './styles';

export interface IList extends sl.IListStyleProps, Omit<IBox<HTMLUListElement | HTMLOListElement>, 'as'> {
  as?: 'ul' | 'ol';
}

export const List: React.FunctionComponent<IList> = React.forwardRef<HTMLUListElement | HTMLOListElement, IList>(
  function List(props, ref) {
    const { as = 'ul', listStyle, listStylePosition, css, ...rest } = props;

    return <Box {...rest} as={as} ref={ref} css={[listStyles({ listStyle, listStylePosition }), css]} />;
  }
);

export const listStyles = ({ listStyle, listStylePosition }: IList) => {
  return sl.listStyle({ listStyle, listStylePosition });
};
