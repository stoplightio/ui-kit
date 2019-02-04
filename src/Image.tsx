/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';

export interface IImage extends IBox<HTMLImageElement> {
  hidden?: boolean;
  responsive?: boolean;
}

export const Image: FunctionComponent<IImage> = props => {
  const { hidden, responsive, ...rest } = props;

  const css = imageStyles({ hidden, responsive });

  return jsx(Box, {
    ...rest,
    as: 'img',
    css,
  });
};

export const imageStyles = ({ hidden, responsive }: IImage = {}) => [
  hidden && {
    display: 'none',
  },

  responsive && {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
];
