import {
  bgColor,
  borders,
  bottom,
  boxShadow,
  css,
  cursor,
  display,
  flex,
  fontSize,
  fontWeight,
  height,
  left,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  position,
  right,
  space,
  styled,
  textAlign,
  textColor,
  top,
  width,
  zIndex,
} from './utils';

import {
  IBorderRadius,
  IBorderWidth,
  IBoxDimension,
  IBoxShadow,
  ICSSProps,
  IFontSize,
  IFontWeight,
  IFullSpace,
  ValueOf,
} from './types';

export interface IBoxProps {
  className?: string;
  css?: Object; // a valid javascript style object
  as?: any; // TODO type string || jsx element

  fg?: string; // should ALWAYS be a theme color path to avoid hardcoding in values
  bg?: string; // should ALWAYS be a theme color path to avoid hardcoding in values

  text?: ValueOf<IFontSize>;
  align?: ICSSProps['textAlign']; // textAlign
  weight?: ValueOf<IFontWeight> | ICSSProps['fontWeight'];

  m?: ValueOf<IFullSpace> | number;
  mt?: ValueOf<IFullSpace> | number;
  mr?: ValueOf<IFullSpace> | number;
  mb?: ValueOf<IFullSpace> | number;
  ml?: ValueOf<IFullSpace> | number;
  mx?: ValueOf<IFullSpace> | number;
  my?: ValueOf<IFullSpace> | number;
  p?: ValueOf<IFullSpace> | number;
  pt?: ValueOf<IFullSpace> | number;
  pr?: ValueOf<IFullSpace> | number;
  pb?: ValueOf<IFullSpace> | number;
  pl?: ValueOf<IFullSpace> | number;
  px?: ValueOf<IFullSpace> | number;
  py?: ValueOf<IFullSpace> | number;

  height?: ValueOf<IBoxDimension> | string | number;
  maxHeight?: ValueOf<IBoxDimension> | string | number;
  minHeight?: ValueOf<IBoxDimension> | string | number;
  width?: ValueOf<IBoxDimension> | string | number;
  maxWidth?: ValueOf<IBoxDimension> | string | number;
  minWidth?: ValueOf<IBoxDimension> | string | number;

  border?: ValueOf<IBorderWidth> | number;
  borderTop?: ValueOf<IBorderWidth> | number;
  borderLeft?: ValueOf<IBorderWidth> | number;
  borderRight?: ValueOf<IBorderWidth> | number;
  borderBottom?: ValueOf<IBorderWidth> | number;
  borderColor?: string;
  radius?: ValueOf<IBorderRadius> | number;

  cursor?: ICSSProps['cursor'];

  display?: ICSSProps['display'];
  flex?: ICSSProps['flex'];
  shadow?: ValueOf<IBoxShadow>;
  opacity?: ICSSProps['opacity'];

  overflow?: ICSSProps['overflow'];
  overflowX?: ICSSProps['overflow'];
  overflowY?: ICSSProps['overflow'];

  position?: ICSSProps['position'];
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;

  z?: ICSSProps['z'];
}

export const Box = styled<IBoxProps, 'div'>('div')(
  // Order matters
  // @ts-ignore
  bgColor,
  textColor,
  borders,
  boxShadow,

  fontSize,
  fontWeight,
  textAlign,

  space,
  display,
  flex,
  cursor,
  opacity,
  zIndex,

  position,
  top,
  right,
  bottom,
  left,

  height,
  width,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  css
);
