/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';

import { Box, IBox } from './Box';

export const Image: FunctionComponent<IImage> = props => {
  const { as = 'img', hidden, responsive, ...rest } = props;

  const css = [...imageStyles({ hidden, responsive })];

  return jsx(Box, {
    ...rest,
    as,
    css,
  });
};

export interface IImage extends IImageProps, IBox, HTMLAttributes<'img'> {}

export interface IImageProps {
  hidden?: boolean;
  responsive?: boolean;
}

export const imageStyles = ({ hidden, responsive }: IImageProps = {}) => [
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
