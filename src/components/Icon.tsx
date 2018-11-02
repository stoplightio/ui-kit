import * as React from 'react';

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
} from '../utils';

import { BorderRadius, BorderWidth, FontSize, FullSpace } from '../types';

import { FlipProp, IconDefinition, RotateProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO register the icons within whatever app and then use string and prefixes instead of importing icons
// example <Icon icon=['fal', 'coffee'] /> or <Icon icon="coffee" />

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { fal } from '@fortawesome/pro-light-svg-icons';
// import { far } from '@fortawesome/pro-regular-svg-icons';
// import { fas } from '@fortawesome/pro-solid-svg-icons';
// library.add(fab, fal, fas, far);

export interface IconProps {
  className?: string;
  icon: IconDefinition;
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

  postion?: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;

  z?: number;
}

export const Icon = styled<IconProps>((props: IconProps) => {
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
