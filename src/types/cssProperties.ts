import {
  BrStyle,
  ContentDistribution,
  ContentPosition,
  DisplayInside,
  DisplayInternal,
  DisplayLegacy,
  DisplayOutside,
  FlexDirectionProperty,
  FlexWrapProperty,
  FontWeightProperty,
  Globals,
  GlobalsNumber,
  OverflowXProperty,
  PositionProperty,
  SelfPosition,
  TextAlignProperty,
  TextTransformProperty,
  ZIndexProperty,
} from 'csstype';
/**
 * CSStypes
 *
 * typescript does not allow things such as type = "some-string" | string
 * so here we are using a subset of types from css types and altering slightly
 */

export interface ICSSProps {
  borderStyle: Globals | BrStyle;

  cursor:
    | Globals
    | '-moz-grab'
    | '-webkit-grab'
    | 'alias'
    | 'all-scroll'
    | 'auto'
    | 'cell'
    | 'col-resize'
    | 'context-menu'
    | 'copy'
    | 'crosshair'
    | 'default'
    | 'e-resize'
    | 'ew-resize'
    | 'grab'
    | 'grabbing'
    | 'help'
    | 'move'
    | 'n-resize'
    | 'ne-resize'
    | 'nesw-resize'
    | 'no-drop'
    | 'none'
    | 'not-allowed'
    | 'ns-resize'
    | 'nw-resize'
    | 'nwse-resize'
    | 'pointer'
    | 'progress'
    | 'row-resize'
    | 's-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'text'
    | 'vertical-text'
    | 'w-resize'
    | 'wait'
    | 'zoom-in'
    | 'zoom-out';

  display:
    | Globals
    | DisplayOutside
    | DisplayInside
    | DisplayInternal
    | DisplayLegacy
    | 'contents'
    | 'list-item'
    | 'none';

  flex: Globals | 'auto' | 'available' | 'content' | 'fit-content' | 'max-content' | 'min-content' | 'none' | number;
  flexAlignItems: Globals | SelfPosition | 'baseline' | 'normal' | 'stretch';
  flexJustifyContent: Globals | ContentDistribution | ContentPosition | 'left' | 'normal' | 'right';
  flexDirection: FlexDirectionProperty;
  flexWrap: FlexWrapProperty;

  fontWeight: FontWeightProperty;

  letterSpacing: Globals | 'normal' | number;
  lineHeight: Globals | 'normal' | number;

  listItemType:
    | 'circle'
    | 'disc'
    | 'square'
    | 'armenian'
    | 'cjk-ideographic'
    | 'decimal'
    | 'decimal-leading-zero'
    | 'georgian'
    | 'hebrew'
    | 'hiragana'
    | 'hiragana-iroha'
    | 'katakana'
    | 'katakana-iroha'
    | 'lower-alpha'
    | 'lower-greek'
    | 'lower-latin'
    | 'lower-roman'
    | 'upper-alpha'
    | 'upper-greek'
    | 'upper-latin'
    | 'upper-roman'
    | 'none'
    | 'inherit';
  listPosition: Globals | 'inside' | 'outside';

  opacity: GlobalsNumber;

  overflow: OverflowXProperty;

  position: PositionProperty;

  textAlign: TextAlignProperty;

  textDecoration:
    | Globals
    | 'blink'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'line-through'
    | 'none'
    | 'overline'
    | 'solid'
    | 'underline'
    | 'wavy';

  textTransform: TextTransformProperty;

  z: ZIndexProperty;
}
