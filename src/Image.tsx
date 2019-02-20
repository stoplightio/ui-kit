import * as React from 'react';

import { Box, IBox } from './Box';

export interface IImage extends IBox<HTMLImageElement> {
  hidden?: boolean;
  responsive?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, IImage>((props, ref) => {
  const { hidden, responsive, ...rest } = props;

  return <Box {...rest} as="img" ref={ref} css={imageStyles({ hidden, responsive })} />;
});

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
