import { BorderRadiusProperty, WidthProperty } from 'csstype';

export type ValueOf<T> = T[keyof T];

export interface IFontSize {
  xs: '@xs';
  sm: '@sm';
  md: '@md';
  lg: '@lg';
  xl: '@xl';
  '2xl': '@2xl';
  '3xl': '@3xl';
  '4xl': '@4xl';
  '5xl': '@5xl';
  '6xl': '@6xl';
}

export interface IFontWeight {
  thin: '@thin';
  light: '@light';
  normal: '@normal';
  medium: '@medium';
  semibold: '@semibold';
  bold: '@bold';
  extrabold: '@extrabold';
}

export interface ILineHeight {
  reset: '@reset';
  none: '@none';
  tight: '@tight';
  normal: '@normal';
  loose: '@loose';
}

export interface ILetterSpacing {
  tight: '@tight';
  normal: '@normal';
  wide: '@wide';
}

export interface IBorderRadius {
  none: '@none';
  sm: '@sm';
  md: '@md';
  lg: '@lg';
  xl: '@xl';
  full: '@full';
}

export interface IBorderWidth {
  none: '@none';
  xs: '@xs';
  sm: '@sm';
  md: '@md';
  lg: '@lg';
}

export interface IBoxDimension {
  auto: '@auto';
  none: '@none';
  px: '@px';
  full: '@full';
  screen: '@screen';
}

export interface ISpace {
  none: '@none';
  xs: '@xs';
  sm: '@sm';
  md: '@md';
  lg: '@lg';
  xl: '@xl';
  '2xl': '@2xl';
  '3xl': '@3xl';
  '4xl': '@4xl';
  '5xl': '@5xl';
  '6xl': '@6xl';
}

export interface IFullSpace extends ISpace {
  '-xs': '-@xs';
  '-sm': '-@sm';
  '-md': '-@md';
  '-lg': '-@lg';
  '-xl': '-@xl';
  '-2xl': '-@2xl';
  '-3xl': '-@3xl';
  '-4xl': '-@4xl';
  '-5xl': '-@5xl';
  '-6xl': '-@6xl';
}
export type BoxShadow = keyof IShadows;

export interface IThemeInterface<
  TSections extends string = '',
  // extend Components and set as a default so user can add additional components if desired
  TComponents extends Components = Components
> extends ISectionTheme<TComponents> {
  base: ILayout;

  // Extended from ISectionTheme these will be globals used throughout the app
  // colors?: ...
  // components?: ...

  // uses generics so you can pass in sections TSections = header | footer | sidebar... (this allows different typings for platform and hubs)
  // sections are used to colorize the bg/fg/border of the section as well as override nested component colors
  sections?: { [section in TSections]: ISectionTheme<TComponents> };
}

export interface ISectionTheme<TComponents extends Components = Components> {
  colors?: Partial<IColors>;
  shadows?: Partial<IShadows>;

  components?: { [component in TComponents]?: Partial<IColors> };
}

export interface ILayout {
  textSize: { [key in keyof IFontSize]?: number | string }; // px

  weight: { [key in keyof IFontWeight]?: number };

  leading: { [key in keyof ILineHeight]?: number };

  tracking: { [key in keyof ILetterSpacing]?: number }; // ems

  radius: { [key in keyof IBorderRadius]?: number | string }; // px

  border: { [key in keyof IBorderWidth]?: number | string }; // px

  space: { [key in keyof ISpace]?: number | string }; // px

  height?: { [key in keyof IBoxDimension]?: number | string };

  width?: { [key in keyof IBoxDimension]?: number | string };

  scrollbars?: {
    thumb?: string;
    thumbRadius?: BorderRadiusProperty<string>;
    width?: WidthProperty<string>;
  };
}

// Can be nested into itself example { colors: { primary: { base: #FFFF, light: #FFFF } } }

export interface IColors {
  fg: string;
  bg: string;
  border: string;

  [color: string]: string | Partial<IColors>;
}

export interface IShadows {
  sm: string;
  md: string;
  lg: string;

  [color: string]: string | Partial<IShadows>;
}

// components created in this repo
export type Components =
  | 'blockQuote'
  | 'button'
  | 'checkbox'
  | 'codeEditor'
  | 'contextMenu'
  | 'input'
  | 'menu'
  | 'textarea'
  | 'toggle';
