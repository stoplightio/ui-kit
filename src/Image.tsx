import * as React from 'react';

import { Box, IBox } from './Box';

export interface IImage extends IBox<HTMLImageElement> {
  hidden?: boolean;
  responsive?: boolean;
}

export const Image: React.FunctionComponent<IImage> = React.forwardRef<HTMLImageElement, IImage>(function Image(
  props,
  ref
) {
  const { hidden, responsive, css, ...rest } = props;

  return <Box {...rest} as="img" ref={ref} css={imageStyles({ hidden, responsive, css })} />;
});

export const imageStyles = ({ hidden, responsive, css }: IImage = {}) => [
  hidden && {
    display: 'none',
  },

  responsive && {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  css,
];
