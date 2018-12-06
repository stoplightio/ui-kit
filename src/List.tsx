import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Box, IBox } from './Box';

export const List: FunctionComponent<IList> = props => {
  const { as = 'ul', ...rest } = props;

  return jsx(Box, {
    ...rest,
    as,
  });
};

export interface IList extends IBox, HTMLAttributes<HTMLUListElement> {}
