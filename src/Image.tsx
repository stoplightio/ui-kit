import * as React from 'react';
import { height, opacity, styled, width } from './utils';

export interface IImageProps {
  circular?: boolean;
  height?: string;
  hidden?: boolean;
  label?: string;
  opacity?: number;
  responsive?: boolean;
  rounded?: boolean;
  src: string;
  width?: string;
}

interface IPlainImageProps extends IImageProps {
  className: string;
}

const PlainImage = (props: IPlainImageProps) => <img className={props.className} src={props.src} title={props.label} />;

export const Image = styled<IImageProps, 'img'>(PlainImage as any)(
  // @ts-ignore
  ({ rounded, circular }: IImageProps) => ({
    borderRadius: rounded ? '25%' : circular ? '100%' : '0',
  }),
  {
    display: 'inline',
  },
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
