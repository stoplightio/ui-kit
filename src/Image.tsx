import * as React from 'react';

import { Box, IBox } from './Box';

export interface IImage extends IBox<HTMLImageElement> {
  hidden?: boolean;
  responsive?: boolean;
}

export const Image: React.FunctionComponent<IImage> = props => {
  const { hidden, responsive, ...rest } = props;

  return <Box {...rest} as="img" css={imageStyles({ hidden, responsive })} />;
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
