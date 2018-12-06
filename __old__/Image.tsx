import { styled } from './utils';

import { Box, IBoxProps } from './Box';

export interface IImageProps extends IBoxProps {
  src: HTMLImageElement['src'];
  alt?: HTMLImageElement['alt'];
  title?: HTMLImageElement['title'];
  hidden?: boolean;
  responsive?: boolean;
  height?: HTMLImageElement['height'];
  width?: HTMLImageElement['width'];
}

export const Image = styled<IImageProps, 'img'>(Box as any).attrs({
  as: 'img',
})(
  // @ts-ignore
  ({ hidden }: IImageProps) => hidden && { display: 'none' },

  ({ responsive }: IImageProps) =>
    responsive && {
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    }
);

Image.defaultProps = {
  hidden: false,
  responsive: false,
};
