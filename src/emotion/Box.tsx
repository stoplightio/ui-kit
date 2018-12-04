/* @jsx jsx */

import { jsx } from '@emotion/core';
import { CSSProperties, FunctionComponent, ReactHTML } from 'react';
import * as ss from 'styled-system';

import * as sl from './styles';

export const Box: FunctionComponent<IBox> = props => {
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
    textDecoration,
    color,
    backgroundColor,
    ...rest
  } = props;

  /** Add all the supported styles, passing in the relevant props. */
  const css = [
    ss.borders({ border, borderTop, borderBottom, borderLeft, borderRight }),
    ss.borderRadius({ borderRadius }),
    ss.boxShadow({ boxShadow }),
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

    sl.color({ color, backgroundColor }),
    sl.textDecoration({ textDecoration }),
  ];

  /** User provided style get pushed on last. */
  if (style) css.push(style);

  return jsx(as, {
    ...rest,
    children,
    css,
  });
};

export interface IBox
  extends sl.IColorProps,
    sl.ITextDecorationProps,
    ss.BorderProps,
    ss.BorderTopProps,
    ss.BorderBottomProps,
    ss.BorderLeftProps,
    ss.BorderRightProps,
    ss.BorderRadiusProps,
    ss.BoxShadowProps,
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
  as?: keyof ReactHTML;
  style?: CSSProperties;
  [key: string]: any;
}
