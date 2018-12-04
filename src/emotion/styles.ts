import {
  BackgroundColorProperty,
  ColorProperty,
  TextDecorationColorProperty,
  TextDecorationProperty,
  TextTransformProperty,
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
}

export const textDecoration = (props: ITextDecorationProps) => ({
  textDecoration: props.textDecoration,
});

export interface ITextDecorationColorProps {
  textDecorationColor?: TextDecorationColorProperty;
}

export const textDecorationColor = (props: ITextDecorationColorProps) => ({
  textDecorationColor: props.textDecorationColor,
});

export interface ITextTransformProps {
  textTransform?: TextTransformProperty;
}

export const textTransform = (props: ITextTransformProps) => ({
  textTransform: props.textTransform,
});
