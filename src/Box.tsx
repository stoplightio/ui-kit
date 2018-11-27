import { BorderStyleProperty } from 'csstype';

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
  BorderRadiusVal,
  BorderWidthVal,
  BoxDimensionVal,
  FontSizeVal,
  FontWeightVal,
  FullSpaceVal,
  ShadowsVal,
} from './types';

export interface IBoxProps {
  className?: string;
  css?: Object; // a valid javascript style object
  as?: any; // TODO type string || jsx element

  fg?: string; // should ALWAYS be a theme color path to avoid hardcoding in values
  bg?: string; // should ALWAYS be a theme color path to avoid hardcoding in values

  text?: FontSizeVal;
  align?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit'; // textAlign
  weight?: FontWeightVal;

  m?: FullSpaceVal;
  mt?: FullSpaceVal;
  mr?: FullSpaceVal;
  mb?: FullSpaceVal;
  ml?: FullSpaceVal;
  mx?: FullSpaceVal;
  my?: FullSpaceVal;
  p?: FullSpaceVal;
  pt?: FullSpaceVal;
  pr?: FullSpaceVal;
  pb?: FullSpaceVal;
  pl?: FullSpaceVal;
  px?: FullSpaceVal;
  py?: FullSpaceVal;

  height?: BoxDimensionVal | string | number;
  maxHeight?: BoxDimensionVal | string | number;
  minHeight?: BoxDimensionVal | string | number;
  width?: BoxDimensionVal | string | number;
  maxWidth?: BoxDimensionVal | string | number;
  minWidth?: BoxDimensionVal | string | number;

  border?: BorderWidthVal;
  borderTop?: BorderWidthVal;
  borderLeft?: BorderWidthVal;
  borderRight?: BorderWidthVal;
  borderBottom?: BorderWidthVal;
  borderColor?: string;
  radius?: BorderRadiusVal | string;
  borderStyle?: BorderStyleProperty;

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
  shadow?: ShadowsVal | string;
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

interface IAllProps extends IBoxProps, Partial<React.AllHTMLAttributes<'div'>> {
  as?: any;
}

// Order matters
export const Box = styled<IAllProps, 'div'>('div' as any)(
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
