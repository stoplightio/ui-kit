import { BackgroundColorProperty, ColorProperty, TextDecorationProperty } from 'csstype';

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
