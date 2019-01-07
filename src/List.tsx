/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import * as sl from './styles';

export const List: FunctionComponent<IList> = props => {
  const { as = 'ul', listStyle, listStylePosition, ...rest } = props;

  const css = sl.listStyle({ listStyle, listStylePosition });

  return <Box {...rest} as={as} css={css} />;
};

export interface IList extends IListProps, sl.IListStyleProps, Omit<IBox<HTMLUListElement | HTMLOListElement>, 'as'> {}

export interface IListProps {
  as?: 'ul' | 'ol';
}
