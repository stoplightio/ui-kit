import { FlipProp, IconName, IconPrefix, library, RotateProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { IBorderRadius, IBorderWidth, ICSSProps, IFontSize, IFullSpace, ValueOf } from './types';

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

  border?: ValueOf<IBorderWidth> | number;
  borderTop?: ValueOf<IBorderWidth> | number;
  borderLeft?: ValueOf<IBorderWidth> | number;
  borderRight?: ValueOf<IBorderWidth> | number;
  borderBottom?: ValueOf<IBorderWidth> | number;
  borderColor?: string;
  radius?: ValueOf<IBorderRadius> | number;

  opacity?: ICSSProps['opacity'];

  position?: ICSSProps['position'];
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;

  z?: ICSSProps['z'];
}

export const IconLibrary = library;

export const Icon = styled<IIconProps>((props: IIconProps) => {
  const { icon, spin, pulse, flip, rotation, className } = props;

  return (
    <FontAwesomeIcon className={className} icon={icon} spin={spin} pulse={pulse} flip={flip} rotation={rotation} />
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
