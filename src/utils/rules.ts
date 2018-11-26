import { concat, get, join, merge } from 'lodash';

// @ts-ignore
import { compose, is, num, px } from 'styled-system';

/**
 * MISC
 */

export const styleColor = ({ prop, cssProperty }: { prop: string; cssProperty?: string }) => {
  // check components first, check colors second, set to default last
  return style({ prop, cssProperty, key: ['components', 'colors'] });
};

// TODO add tests
export const style = ({
  prop,
  cssProperty,
  key,
  transformValue,
}: {
  prop: string;
  cssProperty?: string;
  key?: string | Array<string | string[]>;
  transformValue?: Function;
  // TODO FIXME fix the type
}): TemplateStringsArray => {
  const cssName = cssProperty || prop;

  const fn = (props: any) => {
    let val = props[prop];
    if (!is(val)) return null;

    // references a value from the theme
    if (typeof val === 'string' && val.startsWith('@')) {
      // key is an array of fallbacks so check each in order break when value is found
      if (typeof key === 'object') {
        for (const index in key) {
          const newVal = get(props.theme, join(concat(key[index], val.slice(1)), '.'));

          if (newVal) {
            val = newVal;
            break;
          }
        }
      } else {
        val = get(props.theme, join(concat(key, val.slice(1)), '.')) || val;
      }
    }

    if (transformValue) {
      val = transformValue(val);
    }

    return is(val)
      ? {
          [cssName]: val,
        }
      : null;
  };

  // @ts-ignore FIXME
  return fn;
};

/**
 * Box
 */

export const bgColor = styleColor({
  prop: 'bg',
  cssProperty: 'backgroundColor',
});

export const boxShadow = style({
  prop: 'shadow',
  cssProperty: 'boxShadow',
  key: ['components', 'shadows'],
});

export const cursor = style({
  prop: 'cursor',
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
  // @ts-ignore FIXME
  overflowDefault,
  overflowX,
  overflowY
);

export const zIndex = style({
  prop: 'z',
  cssProperty: 'zIndex',
});

// @ts-ignore FIXME
export const getBorder = n => (num(n) && n > 0 ? n + 'px solid' : n);

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

export const borderRadius = style({
  prop: 'radius',
  cssProperty: 'borderRadius',
  key: 'base.radius',
  transformValue: px,
});

export const borderColor = styleColor({
  prop: 'borderColor',
});

// use compose to ensure proper css order
export const borderStyle = style({
  prop: 'borderStyle',
});

export const borders = compose(
  // @ts-ignore FIXME
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderStyle,
  borderRadius
);

// @ts-ignore FIXME
const percentagePx = n => (!num(n) || n > 1 ? px(n) : n * 100 + '%');

export const height = style({
  prop: 'height',
  key: 'base.height',
  transformValue: percentagePx,
});

export const maxHeight = style({
  prop: 'maxHeight',
  key: 'base.height',
  transformValue: percentagePx,
});

export const minHeight = style({
  prop: 'minHeight',
  key: 'base.height',
  transformValue: px,
});

export const width = style({
  prop: 'width',
  key: 'base.width',
  transformValue: percentagePx,
});

export const maxWidth = style({
  prop: 'maxWidth',
  key: 'base.width',
  transformValue: percentagePx,
});

export const minWidth = style({
  prop: 'minWidth',
  key: 'base.width',
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

// @ts-ignore FIXME
const getProperties = key => {
  const [a, b] = key.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
};

// @ts-ignore FIXME
const getSpaceValue = (scale = {}) => propVal => {
  let val = propVal;
  let isNegative;

  if (typeof val === 'string') {
    if (val[0] === '-') {
      isNegative = true;
      val = val.replace('-', '');
    }

    // check the theme config for a value, or just use the prop
    val = (val.startsWith('@') ? scale[val.slice(1)] : val) || val;
  }

  // if was negative string/add the '-' back
  return (isNegative ? '-' : '') + px(val);
};

// @ts-ignore FIXME
export const space = props => {
  // test for spacing props, so m* and p*
  // get space configuration from theme
  const scale = get(props.theme, 'base.space');
  // function to convert propVal -> cssVal
  const getStyle = getSpaceValue(scale);

  // to ensure proper order
  const keys = [
    ...Object.keys(props).filter(key => /^[mp]$/.test(key)),
    ...Object.keys(props).filter(key => /^[mp][xy]$/.test(key)),
    ...Object.keys(props).filter(key => /^[mp][trbl]$/.test(key)),
  ];

  // return all style functions for every direction
  return keys
    .map(key => {
      const value = props[key];
      const innerProperties = getProperties(key);

      // @ts-ignore FIXME
      const innerStyle = n =>
        is(n)
          ? innerProperties.reduce(
              (a, prop) => ({
                ...a,
                [prop]: getStyle(n),
              }),
              {}
            )
          : null;

      return innerStyle(value);
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
  transformValue: (n: boolean) => (n ? 'italic' : 'normal'),
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
  transformValue: (n: string | number) => (num(n) ? n + 'em' : n),
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

export const textColor = styleColor({
  prop: 'fg',
  cssProperty: 'color',
});

// @ts-ignore FIXME
export const decoration = props => {
  const val = props.decoration;
  if (!val) return null;

  // support passing in two decorations like ['underline', 'strike-through']
  // @ts-ignore FIXME
  const innerStyle = n =>
    n && {
      textDecoration: Array.isArray(n) ? n.join(' ') : n,
      textDecorationStyle: 'solid',
    };

  return innerStyle(val);
};

export const decorationColor = styleColor({
  prop: 'decorationColor',
  cssProperty: 'textDecorationColor',
});

// TODO customizae to use lodash from more more options like snakecase
export const casing = style({
  prop: 'casing',
  cssProperty: 'textTransform',
});

/**
 * LIST
 */

export const listStyleType = style({
  prop: 'itemType',
  cssProperty: 'listStyleType',
});

export const listStylePosition = style({
  prop: 'listPosition',
  cssProperty: 'listStylePosition',
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

// @ts-ignore FIXME
export const css = props => props.css;

export { bottom, display, flex, left, opacity, position, right, top } from 'styled-system';
