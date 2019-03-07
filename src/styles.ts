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

export interface IColorProps {
  color?: ColorProperty;
  backgroundColor?: BackgroundColorProperty;
}

export const color = (props: IColorProps) => ({
  color: props.color,
  backgroundColor: props.backgroundColor,
});

export interface ITextDecorationProps {
  textDecoration?: TextDecorationProperty;
  textDecorationColor?: TextDecorationColorProperty;
}

export const textDecoration = (props: ITextDecorationProps) => ({
  textDecoration: props.textDecoration,
  textDecorationColor: props.textDecorationColor,
});

export interface ITextTransformProps {
  textTransform?: TextTransformProperty;
}

export const textTransform = (props: ITextTransformProps) => ({
  textTransform: props.textTransform,
});

export interface IListStyleProps {
  listStyle?: ListStyleProperty;
  listStylePosition?: ListStylePositionProperty;
}

export const listStyle = (props: IListStyleProps) => ({
  listStyle: props.listStyle,
  listStylePosition: props.listStylePosition,
});

export interface ITransformProps {
  transform?: TransformProperty;
}

export const transform = (props: ITransformProps) => ({
  transform: props.transform,
});

export interface IFlexFlowProperty {
  flexFlow?: FlexFlowProperty;
}

export const flexFlow = (props: IFlexFlowProperty) => ({
  flexFlow: props.flexFlow,
});

export interface ICursorProps {
  cursor?: CursorProperty;
}

export const cursor = (props: ICursorProps) => ({
  cursor: props.cursor,
});

export interface IVisibilityProps {
  visibility?: VisibilityProperty;
}

export const visibility = (props: IVisibilityProps) => ({
  visibility: props.visibility,
});

export const overflow = (props: IOverflowProps) => ({
  overflow: props.overflow,
  overflowX: props.overflowX,
  overflowY: props.overflowY,
});

export interface IOverflowProps {
  overflow?: OverflowProperty;
  overflowX?: OverflowXProperty;
  overflowY?: OverflowYProperty;
}

export const boxSizing = (props: IBoxSizingProps) => ({
  boxSizing: props.boxSizing,
});

export interface IBoxSizingProps {
  boxSizing?: BoxSizingProperty;
}

export const textOverflow = (props: ITextOverflowProps) => ({
  textOverflow: props.textOverflow,
});

export interface ITextOverflowProps {
  textOverflow?: TextOverflowProperty;
}

export const whiteSpace = (props: IWhiteSpaceProps) => ({
  whiteSpace: props.whiteSpace,
});

export interface IWhiteSpaceProps {
  whiteSpace?: WhiteSpaceProperty;
}
