import { get, merge } from 'lodash';
import { compose, is, num, px, style } from 'styled-system';

/**
 * Box
 */

export const borderRadius = style({
  prop: 'radius',
  cssProperty: 'borderRadius',
  key: 'base.radius',
  transformValue: px,
});

export const boxShadow = style({
  prop: 'shadow',
  cssProperty: 'boxShadow',
  key: 'base.shadow',
});

const overflowX = style({
  prop: 'overflowX',
});

const overflowY = style({
  prop: 'overflowY',
});

const overflowDefault = style({
  prop: 'overflow',
});

export const overflow = compose(
  overflowX,
  overflowY,
  overflowDefault
);

export const zIndex = style({
  prop: 'z',
  cssProperty: 'zIndex',
});

const getBorder = n => (num(n) && n > 0 ? n + 'px solid' : n);
export const border = style({
  prop: 'border',
  key: 'base.border',
  transformValue: getBorder,
});

export const borderTop = style({
  prop: 'borderTop',
  key: 'base.border',
  transformValue: getBorder,
});

export const borderRight = style({
  prop: 'borderRight',
  key: 'base.border',
  transformValue: getBorder,
});

export const borderBottom = style({
  prop: 'borderBottom',
  key: 'base.border',
  transformValue: getBorder,
});

export const borderLeft = style({
  prop: 'borderLeft',
  key: 'base.border',
  transformValue: getBorder,
});

export const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft
);

const percentagePx = n => (!num(n) || n > 1 ? px(n) : n * 100 + '%');

export const height = style({
  prop: 'height',
  key: 'config.height',
  transformValue: percentagePx,
});

export const maxHeight = style({
  prop: 'maxHeight',
  key: 'config.height',
  transformValue: percentagePx,
});

export const minHeight = style({
  prop: 'minHeight',
  key: 'config.height',
  transformValue: px,
});

export const width = style({
  prop: 'width',
  key: 'config.width',
  transformValue: percentagePx,
});

export const maxWidth = style({
  prop: 'maxWidth',
  key: 'config.width',
  transformValue: percentagePx,
});

export const minWidth = style({
  prop: 'minWidth',
  key: 'config.width',
  transformValue: px,
});

/**
 * SPACE
 *
 * taken from styled-system and modified
 * https://github.com/jxnblk/styled-system/blob/master/src/index.js#L141
 *
 */

const properties = {
  m: 'margin',
  p: 'padding',
};
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

const getProperties = key => {
  const [a, b] = key.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
};

const getSpaceValue = scale => propVal => {
  let val = propVal;
  let isNegative;

  if (typeof val === 'string') {
    if (val[0] === '-') {
      isNegative = true;
      val = val.replace('-', '');
    }

    // check the theme config for a value, or just use the prop
    val = scale[val] || val;
  }

  // if was negative string/add the '-' back
  return (isNegative ? '-' : '') + px(val);
};

export const space = props => {
  // test for spacing props, so m* and p*
  const keys = Object.keys(props).filter(key => /^[mp][trblxy]?$/.test(key));
  // get space configuration from theme
  const scale = get(props.theme, 'base.space');
  // function to convert propVal -> cssVal
  const getStyle = getSpaceValue(scale);

  // return all style functions for every direction
  return keys
    .map(key => {
      const value = props[key];
      const properties = getProperties(key);

      const style = n =>
        is(n)
          ? properties.reduce(
              (a, prop) => ({
                ...a,
                [prop]: getStyle(n),
              }),
              {}
            )
          : null;

      return style(value);
    })
    .reduce(merge, {});
};

/**
 * FLEX
 */

export const alignItems = style({
  prop: 'items',
  cssProperty: 'alignItems',
});

export const justifyContent = style({
  prop: 'justify',
  cssProperty: 'justifyContent',
});

export const flexDirection = style({
  prop: 'direction',
  cssProperty: 'flexDirection',
});

export const flexWrap = style({
  prop: 'wrap',
  cssProperty: 'flexWrap',
});

/**
 * TEXT
 */

export const fontStyle = style({
  prop: 'italic',
  cssProperty: 'fontStyle',
  transformValue: n => (n ? 'italic' : 'normal'),
});

export const fontSize = style({
  prop: 'text',
  cssProperty: 'fontSize',
  key: 'base.textSize',
  transformValue: px,
});

export const fontWeight = style({
  prop: 'weight',
  cssProperty: 'fontWeight',
  key: 'base.weight',
});

export const letterSpacing = style({
  prop: 'tracking',
  cssProperty: 'letterSpacing',
  key: 'base.tracking',
  transformValue: n => (num(n) ? n + 'em' : n),
});

export const lineHeight = style({
  prop: 'leading',
  cssProperty: 'lineHeight',
  key: 'base.leading',
});

export const textAlign = style({
  prop: 'align',
  cssProperty: 'textAlign',
});

export const textColor = style({
  prop: 'fg',
  cssProperty: 'color',
  key: 'colors',
});

export const decoration = props => {
  const val = props.decoration;
  if (!val) return null;

  // support passing in two decorations like ['underline', 'strike-through']
  const style = n =>
    n && {
      textDecoration: Array.isArray(n) ? n.join(' ') : n,
      textDecorationStyle: 'solid',
    };

  return style(val);
};

export const decorationColor = style({
  prop: 'decorationColor',
  cssProperty: 'textDecorationColor',
  key: 'colors',
});

// TODO customizae to use lodash from more more options like snakecase
export const casing = style({
  prop: 'casing',
  cssProperty: 'textTransform',
});

/**
 * NOT USED
 */

// alignContent,
// alignSelf,
// background,
// backgroundImage,
// backgroundPosition,
// backgroundRepeat,
// backgroundSize,
// borderBottom,
// borderLeft,
// border
// borderRight,
// borderTop,
// buttonStyle,
// colorStyle,
// color,
// flexBasis
// fontFamily,
// fontStyle,
// justifyItems,
// justifySelf,
// gridArea,
// gridAutoColumns,
// gridAutoFlow,
// gridAutoRows,
// gridColumn,
// gridColumnGap,
// gridGap,
// gridRow,
// gridRowGap,
// gridTemplateAreas,
// gridTemplateColumns,
// gridTemplateRows,
// order,
// ratio,
// ratioPadding,
// size,
// sizeHeight,
// sizeWidth,
// textStyle,
// verticalAlign,

export {
  bgColor,
  borderColor,
  bottom,
  css,
  display,
  flex,
  left,
  opacity,
  position,
  right,
  top,
} from 'styled-system';
