import {
  bgColor,
  borderColor,
  borderRadius,
  borders,
  borderStyle,
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

import { BorderStyleProperty } from 'csstype';
import { BorderRadius, BorderWidth, BoxDimension, BoxShadow, FontSize, FontWeight, FullSpace } from './types';

export interface IBoxProps {
  className?: string;
  css?: Object; // a valid javascript style object

  fg?: string; // should ALWAYS be a theme color path to avoid hardcoding in values
  bg?: string; // should ALWAYS be a theme color path to avoid hardcoding in values

  text?: FontSize;
  align?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit'; // textAlign
  weight?: FontWeight;

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

  height?: BoxDimension | string | number;
  maxHeight?: BoxDimension | string | number;
  minHeight?: BoxDimension | string | number;
  width?: BoxDimension | string | number;
  maxWidth?: BoxDimension | string | number;
  minWidth?: BoxDimension | string | number;

  border?: BorderWidth;
  borderTop?: BorderWidth;
  borderLeft?: BorderWidth;
  borderRight?: BorderWidth;
  borderBottom?: BorderWidth;
  borderColor?: string;
  borderStyle?: BorderStyleProperty;
  radius?: BorderRadius | string;

  cursor?:
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'all-scroll'
    | 'zoom-in'
    | 'zoom-out'
    | 'grab'
    | 'grabbing';

  display?:
    | 'inline'
    | 'block'
    | 'contents'
    | 'flex'
    | 'grid'
    | 'inline-block'
    | 'inline-flex'
    | 'inline-grid'
    | 'inline-table'
    | 'list-item'
    | 'run-in'
    | 'table'
    | 'table-caption'
    | 'table-column-group'
    | 'table-header-group'
    | 'table-footer-group'
    | 'table-row-group'
    | 'table-cell'
    | 'table-column'
    | 'table-row'
    | 'none'
    | 'initial'
    | 'inherit';
  flex?: string | number;
  shadow?: BoxShadow;
  opacity?: number;

  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';

  position?: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;

  z?: number;
}

export const Box = styled<IBoxProps, 'div'>('div')(
  // @ts-ignore
  borders,
  bgColor,
  textColor,
  borderRadius,
  borderColor,
  borderStyle,
  borderColor,
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
  textAlign,
  top,
  width,
  zIndex
);
