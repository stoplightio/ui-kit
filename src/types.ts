export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type FontWeight = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type LineHeight = 'reset' | 'none' | 'tight' | 'normal' | 'loose';
export type LetterSpacing = 'tight' | 'normal' | 'wide';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type BorderWidth = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type BoxShadow = keyof IShadows;
export type BoxDimension = 'auto' | 'none' | 'px' | 'full' | 'screen';
export type Space = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

export type FullSpace = Space | '-xs' | '-sm' | '-md' | '-lg' | '-xl' | '-2xl' | '-3xl' | '-4xl' | '-5xl' | '-6xl';

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
  textSize: { [key in FontSize]?: number | string }; // px

  weight: { [key in FontWeight]?: number };

  leading: { [key in LineHeight]?: number };

  tracking: { [key in LetterSpacing]?: number }; // ems

  radius: { [key in BorderRadius]?: number | string }; // px

  border: { [key in BorderWidth]?: number | string }; // px

  space: { [key in Space]?: number | string }; // px

  height?: { [key in BoxDimension]?: number | string };

  width?: { [key in BoxDimension]?: number | string };
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
export type Components = 'button' | 'checkbox' | 'toggle' | 'contextMenu' | 'blockQuote';
