import { FlipProp, IconName, IconPrefix, library, RotateProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { BorderRadius, BorderWidth, FontSize, FullSpace } from './types';
import {
  bgColor,
  borderColor,
  borderRadius,
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

  text?: FontSize;

  m?: FullSpace;
  mt?: FullSpace;
  mr?: FullSpace;
  mb?: FullSpace;
  ml?: FullSpace;
  mx?: FullSpace;
  my?: FullSpace;
  p?: FullSpace;
  pt?: FullSpace;
  pr?: FullSpace;
  pb?: FullSpace;
  pl?: FullSpace;
  px?: FullSpace;
  py?: FullSpace;

  border?: BorderWidth;
  borderTop?: BorderWidth;
  borderLeft?: BorderWidth;
  borderRight?: BorderWidth;
  borderBottom?: BorderWidth;
  borderColor?: string;
  radius?: BorderRadius;

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
  const { icon, spin, pulse, flip, rotation, className } = props;

  return (
    <FontAwesomeIcon className={className} icon={icon} spin={spin} pulse={pulse} flip={flip} rotation={rotation} />
  );
})(
  borderRadius,
  borderColor,
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
  textAlign,
  textColor,
  top,
  zIndex
);
