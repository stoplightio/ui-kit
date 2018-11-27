import * as React from 'react';

import { borderRadius, height, opacity, styled, width } from './utils';

import { BorderRadiusVal } from './types';

export interface IImageProps {
  src: string;
  label?: string;
  radius?: BorderRadiusVal;
  hidden?: boolean;
  opacity?: number;
  responsive?: boolean;
  height?: string;
  width?: string;
}

interface IPlainImageProps extends IImageProps {
  className: string;
}

const PlainImage = (props: IPlainImageProps) => <img className={props.className} src={props.src} title={props.label} />;

export const Image = styled<IImageProps, 'img'>(PlainImage as any)(
  {
    // @ts-ignore
    display: 'inline',
  },

  borderRadius,
  opacity,
  width,
  height,

  ({ hidden }: IImageProps) =>
    hidden && {
      display: 'none',
    },

  ({ responsive }: IImageProps) =>
    responsive && {
      maxWidth: '100%',
    }
);

Image.defaultProps = {
  circular: false,
  label: '',
  height: 'auto',
  hidden: false,
  opacity: 1,
  responsive: true,
  rounded: false,
  width: 'auto',
};
