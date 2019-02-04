/* @jsx jsx */

import { Interpolation, jsx } from '@emotion/core';
import { ComponentClass, CSSProperties, forwardRef, FunctionComponent, HTMLAttributes, ReactHTML } from 'react';
import * as ss from 'styled-system';

import * as sl from './styles';

export const Box = forwardRef<HTMLOrSVGElement, IBox<HTMLOrSVGElement>>((props, ref) => {
  /** Pull all props out of ...rest so that they don't show up on the rendered <div> as props (noisy) */
  const {
    as = 'div',
    children,
    style,
    border,
    borderTop,
    borderBottom,
    borderLeft,
    borderRight,
    borderRadius,
    boxShadow,
    boxSizing,
    cursor,
    display,
    fontSize,
    fontWeight,
    fontStyle,
    lineHeight,
    letterSpacing,
    m,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    p,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    flex,
    alignSelf,
    textAlign,
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    opacity,
    overflow,
    overflowX,
    overflowY,
    textDecoration,
    textDecorationColor,
    textTransform,
    color,
    backgroundColor,
    borderColor,
    transform,
    visibility,
    ...rest
  } = props;

  /** Add all the supported styles, passing in the relevant props. */
  const css: IBoxCSS = [
    sl.color({ color, backgroundColor }),
    ss.borders({ border, borderTop, borderBottom, borderLeft, borderRight }),
    ss.borderRadius({ borderRadius }),
    ss.borderColor({ borderColor }),
    ss.boxShadow({ boxShadow }),
    sl.boxSizing({ boxSizing }),
    ss.space({ m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, px, py }),
    ss.flex({ flex }),
    ss.alignSelf({ alignSelf }),

    ss.textAlign({ textAlign }),
    ss.lineHeight({ lineHeight }),
    ss.fontSize({ fontSize }),
    ss.fontWeight({ fontWeight }),
    ss.fontStyle({ fontStyle }),
    ss.letterSpacing({ letterSpacing }),

    ss.display({ display }),
    ss.height({ height }),
    ss.minHeight({ minHeight }),
    ss.maxHeight({ maxHeight }),
    ss.width({ width }),
    ss.minWidth({ minWidth }),
    ss.maxWidth({ maxWidth }),

    ss.position({ position }),
    ss.top({ top }),
    ss.bottom({ bottom }),
    ss.left({ left }),
    ss.right({ right }),
    ss.zIndex({ zIndex }),

    ss.opacity({ opacity }),

    sl.transform({ transform }),
    sl.textTransform({ textTransform }),
    sl.textDecoration({ textDecoration, textDecorationColor }),
    sl.cursor({ cursor }),
    sl.visibility({ visibility }),
    sl.overflow({ overflow, overflowX, overflowY }),
  ];

  /** User provided style get pushed on last. */
  if (style) css.push(style as IBoxCSS);

  return jsx<Partial<IBox<HTMLOrSVGElement>>>(
    as,
    {
      ...rest,
      ref,
      css,
    },
    children
  );
});

export interface IBox<T extends HTMLOrSVGElement = HTMLDivElement>
  extends HTMLAttributes<T>,
    sl.IColorProps,
    sl.ITextDecorationProps,
    sl.ITextTransformProps,
    sl.IVisibilityProps,
    sl.IOverflowProps,
    sl.ICursorProps,
    ss.BorderProps,
    ss.BorderTopProps,
    ss.BorderBottomProps,
    ss.BorderLeftProps,
    ss.BorderRightProps,
    ss.BorderRadiusProps,
    ss.BoxShadowProps,
    sl.IBoxSizingProps,
    ss.DisplayProps,
    ss.FontSizeProps,
    ss.FontWeightProps,
    ss.FontStyleProps,
    ss.LineHeightProps,
    ss.LetterSpacingProps,
    ss.SpaceProps,
    ss.FlexProps,
    ss.AlignSelfProps,
    ss.TextAlignProps,
    ss.PositionProps,
    ss.TopProps,
    ss.BottomProps,
    ss.LeftProps,
    ss.RightProps,
    ss.ZIndexProps,
    ss.HeightProps,
    ss.MinHeightProps,
    ss.MaxHeightProps,
    ss.WidthProps,
    ss.MinWidthProps,
    ss.MaxWidthProps,
    ss.OpacityProps {
  as?: keyof ReactHTML | FunctionComponent | ComponentClass;
  children?: any;
  style?: CSSProperties;
  css?: IBoxCSS;
  [key: string]: any;
}

export type IBoxCSS = Interpolation | Interpolation[];
