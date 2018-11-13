/**
 * BOX
 */
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

export const BorderRadius = ['', 'none', 'sm', 'md', 'lg', 'xl', 'full'];
export const BorderWidth = ['', 'none', 'xs', 'sm', 'md', 'lg'];
export const BoxShadow = ['', 'sm', 'md', 'lg'];
export const TextAlign = ['', 'left', 'right', 'center', 'justify', 'initial', 'inherit'];
export const OverFlow = ['', 'visible', 'hidden', 'scroll', 'auto', 'initial', 'inherit'];
export const PositionOpts = ['', 'static', 'relative', 'fixed', 'absolute', 'sticky'];

export const FontSize = ['', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
export const FontWeight = ['', 'thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'];

export const Size: SizeProp[] = ['xs', 'lg', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'];

export const FullSpace = [
  '',
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',

  // negative

  '-xs',
  '-sm',
  '-md',
  '-lg',
  '-xl',
  '-2xl',
  '-3xl',
  '-4xl',
  '-5xl',
  '-6xl',
];

export const Display = [
  '',
  'inline',
  'block',
  'contents',
  'flex',
  'grid',
  'inline-block',
  'inline-flex',
  'inline-grid',
  'inline-table',
  'list-item',
  'run-in',
  'table',
  'table-caption',
  'table-column-group',
  'table-header-group',
  'table-footer-group',
  'table-row-group',
  'table-cell',
  'table-column',
  'table-row',
  'none',
  'initial',
  'inherit',
];

/**
 * FLEX
 */
export const AlignItems = ['', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline', 'initial', 'inherit'];
export const JustifyContent = [
  '',
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'initial',
  'inherit',
];

export const FlexDirection = ['row', 'row-reverse', 'column', 'column-reverse', 'initial', 'inherit'];
export const FlexWrap = ['nowrap', 'wrap', 'wrap-reverse', 'initial', 'inherit'];

/**
 * TEXT
 */
export const Decoration = ['', 'none', 'underline', 'overline', 'line-through', 'initial', 'inherit'];

export const Casing = ['none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit'];
export const LineHeight = ['', 'reset', 'none', 'tight', 'normal', 'loose'];
export const LetterSpacing = ['', 'tight', 'normal', 'wide'];

/**
 * LIST
 */

export const ListStylePosition = ['', 'inside', 'outside', 'initial', 'inherit'];
export const ListStyleType = [
  '',
  'circle',
  'disc',
  'square',
  'armenian',
  'cjk-ideographic',
  'decimal',
  'decimal-leading-zero',
  'georgian',
  'hebrew',
  'hiragana',
  'hiragana-iroha',
  'katakana',
  'katakana-iroha',
  'lower-alpha',
  'lower-greek',
  'lower-latin',
  'lower-roman',
  'upper-alpha',
  'upper-greek',
  'upper-latin',
  'upper-roman',
  'none',
  'inherit',
];

/**
 * INPUT
 */

export const InlineInputType = [
  'text',
  'date',
  'datetime-local',
  'email',
  'number',
  'password',
  'search',
  'time',
  'url',
];

export const AutosizeInputType = ['text', 'email', 'password', 'search', 'url'];
