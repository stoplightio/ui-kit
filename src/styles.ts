import {
  BackgroundColorProperty,
  BoxSizingProperty,
  ColorProperty,
  CursorProperty,
  FlexFlowProperty,
  ListStylePositionProperty,
  ListStyleProperty,
  OverflowProperty,
  OverflowXProperty,
  OverflowYProperty,
  TextDecorationColorProperty,
  TextDecorationProperty,
  TextOverflowProperty,
  TextTransformProperty,
  TransformProperty,
  VisibilityProperty,
  WhiteSpaceProperty,
} from 'csstype';

/**
 * BOX SIZE
 */

export interface IBoxSizingProps {
  boxSizing?: BoxSizingProperty;
}

export const boxSizing = (props: IBoxSizingProps) => ({
  boxSizing: props.boxSizing,
});

/**
 * COLOR
 */

export interface IColorProps {
  color?: ColorProperty;
  backgroundColor?: BackgroundColorProperty;
}

export const color = (props: IColorProps) => ({
  color: props.color,
  backgroundColor: props.backgroundColor,
});

/**
 * CURSOR
 */

export interface ICursorProps {
  cursor?: CursorProperty;
}

export const cursor = (props: ICursorProps) => ({
  cursor: props.cursor,
});

/**
 * FLEX
 */

export interface IFlexFlowProperty {
  flexFlow?: FlexFlowProperty;
}

export const flexFlow = (props: IFlexFlowProperty) => ({
  flexFlow: props.flexFlow,
});

/**
 * LIST STYLE
 */

export interface IListStyleProps {
  listStyle?: ListStyleProperty;
  listStylePosition?: ListStylePositionProperty;
}

export const listStyle = (props: IListStyleProps) => ({
  listStyle: props.listStyle,
  listStylePosition: props.listStylePosition,
});

/**
 * OVERFLOW
 */

export interface IOverflowProps {
  overflow?: OverflowProperty;
  overflowX?: OverflowXProperty;
  overflowY?: OverflowYProperty;
}

export const overflow = (props: IOverflowProps) => ({
  overflow: props.overflow,
  overflowX: props.overflowX,
  overflowY: props.overflowY,
});

/**
 * TEXT DECORATION
 */

export interface ITextDecorationProps {
  textDecoration?: TextDecorationProperty;
  textDecorationColor?: TextDecorationColorProperty;
}

export const textDecoration = (props: ITextDecorationProps) => ({
  textDecoration: props.textDecoration,
  textDecorationColor: props.textDecorationColor,
});

/**
 * TEXT OVERFLOW
 */

export const textOverflow = (props: ITextOverflowProps) => ({
  textOverflow: props.textOverflow,
});

export interface ITextOverflowProps {
  textOverflow?: TextOverflowProperty;
}

/**
 * TEXT TRANSFORM
 */

export interface ITextTransformProps {
  textTransform?: TextTransformProperty;
}

export const textTransform = (props: ITextTransformProps) => ({
  textTransform: props.textTransform,
});

/**
 * TRANSFORM
 */

export interface ITransformProps {
  transform?: TransformProperty;
}

export const transform = (props: ITransformProps) => ({
  transform: props.transform,
});

/**
 * VISIBILITY
 */

export interface IVisibilityProps {
  visibility?: VisibilityProperty;
}

export const visibility = (props: IVisibilityProps) => ({
  visibility: props.visibility,
});

/**
 * WHITESPACE
 */

export interface IWhiteSpaceProps {
  whiteSpace?: WhiteSpaceProperty;
}

export const whiteSpace = (props: IWhiteSpaceProps) => ({
  whiteSpace: props.whiteSpace,
});
