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
  align?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit'; // textAlign
  weight?: ValueOf<IFontWeight>;

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

  height?: ValueOf<IBoxDimension> | string | number;
  maxHeight?: ValueOf<IBoxDimension> | string | number;
  minHeight?: ValueOf<IBoxDimension> | string | number;
  width?: ValueOf<IBoxDimension> | string | number;
  maxWidth?: ValueOf<IBoxDimension> | string | number;
  minWidth?: ValueOf<IBoxDimension> | string | number;

  border?: ValueOf<IBorderWidth>;
  borderTop?: ValueOf<IBorderWidth>;
  borderLeft?: ValueOf<IBorderWidth>;
  borderRight?: ValueOf<IBorderWidth>;
  borderBottom?: ValueOf<IBorderWidth>;
  borderColor?: string;
  radius?: ValueOf<IBorderRadius> | string;

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
  shadow?: ValueOf<IBoxShadow>;
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
