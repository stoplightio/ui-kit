/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import * as sl from './styles';

export interface IList extends sl.IListStyleProps, Omit<IBox<HTMLUListElement | HTMLOListElement>, 'as'> {
  as?: 'ul' | 'ol';
}

export const List: FunctionComponent<IList> = props => {
  const { as = 'ul', listStyle, listStylePosition, ...rest } = props;

  return <Box {...rest} as={as} defaultCSS={listStyles({ listStyle, listStylePosition })} />;
};

export const listStyles = ({ listStyle, listStylePosition }: IList) => {
  return sl.listStyle({ listStyle, listStylePosition });
};
