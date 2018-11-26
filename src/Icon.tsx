import { FlipProp, IconName, IconPrefix, library, RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { IBorderRadius, IBorderWidth, IFontSize, IFullSpace, ValueOf } from './types';

import {
  bgColor,
  borders,
  bottom,
  css,
  fontSize,
  left,
  opacity,
  position,
  right,
  space,
  styled,
  textAlign,
  textColor,
  top,
  zIndex,
} from './utils';

export type IIcon = IconName | [IconPrefix, IconName];

export interface IIconProps {
  className?: string;
  icon: IIcon;
  spin?: boolean;
  pulse?: boolean;
  flip?: FlipProp;
  size?: SizeProp;
  rotation?: RotateProp;

  // Subset of Box
  css?: Object; // a valid javascript style object

  fg?: string;
  bg?: string;

  text?: ValueOf<IFontSize>;

  m?: ValueOf<IFullSpace>;
  mt?: ValueOf<IFullSpace>;
  mr?: ValueOf<IFullSpace>;
  mb?: ValueOf<IFullSpace>;
  ml?: ValueOf<IFullSpace>;
  mx?: ValueOf<IFullSpace>;
  my?: ValueOf<IFullSpace>;
  p?: ValueOf<IFullSpace>;
  pt?: ValueOf<IFullSpace>;
  pr?: ValueOf<IFullSpace>;
  pb?: ValueOf<IFullSpace>;
  pl?: ValueOf<IFullSpace>;
  px?: ValueOf<IFullSpace>;
  py?: ValueOf<IFullSpace>;

  border?: ValueOf<IBorderWidth>;
  borderTop?: ValueOf<IBorderWidth>;
  borderLeft?: ValueOf<IBorderWidth>;
  borderRight?: ValueOf<IBorderWidth>;
  borderBottom?: ValueOf<IBorderWidth>;
  borderColor?: string;
  radius?: ValueOf<IBorderRadius>;

  opacity?: number;

  position?: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;

  z?: number;
}

export const IconLibrary = library;

export const Icon = styled<IIconProps>((props: IIconProps) => {
  const { icon, spin, size, pulse, flip, rotation, className } = props;

  return (
    <FontAwesomeIcon
      className={className}
      icon={icon}
      spin={spin}
      size={size}
      pulse={pulse}
      flip={flip}
      rotation={rotation}
    />
  );
})(
  // @ts-ignore
  bgColor,
  textColor,
  borders,

  space,
  fontSize,
  textAlign,

  position,
  top,
  right,
  bottom,
  left,

  opacity,
  zIndex,

  css
);
