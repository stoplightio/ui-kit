# Theme

The theme object gets passed to a provider and is accessible by styled-components. It is helpul to either define constants and pass them around or use it for dynamic styling that will update with user input.

The theme object is broken down into four major properties:

- **base**: contains layout type constants like font sizes or spacing options, this is used by component props. See [Theme Base](./theme-base.md) for more details

- **colors**: a color definition object used to define "constants" used to theme sections and components and contains our default prepackaged colors

- **components**: defines color theming options for a component and contains our default prepackaged theme. See [Theming Components](./theme-components.md) for more details

- **sections**: defines color theming options for a section, this would get defined by the user, depending on the project, and gets merged over colors and components. Think of this as a theming override. Example is if you wanted a different styled button in both the header and the footer. See [Theming Sections](./theme-section.md) for more details

note that the only one of these properties that should every be changed by an end user is the sections property. It can be used to override colors and components, but those should never be altered directly.

## Interfaces

#### Theme

```typescript
IThemeInterface<TSections extends string = ''> extends ISectionTheme<TComponents> {
  base: ILayout;

  /*
   Extended from ISectionTheme these will be globals used throughout the app
   colors?: ...
   components?: ...
  */


  sections?: { [section in TSections]: ISectionTheme<TComponents> };
}

/*
uses generics so you can pass in sections TSections = header | footer | sidebar... (this allows different typings for platform and hubs)

sections are used to colorize the bg/fg/border of the section as well as override nested component colors
*/
```

#### Section

```typescript
export interface ISectionTheme<TComponents> {
  colors?: Partial<IColors>;

  components?: { [component in TComponents]?: Partial<IColors> };
}

export interface IColors {
  fg: string;
  bg: string;
  border: string;

  [color: string]: string | Partial<IColors>;
}

// Can be nested into itself example {colors: {primary: {base: #FFFF, light: #FFFF}}}
```

#### Base

```typescript
export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type FontWeight = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type LineHeight = 'reset' | 'none' | 'tight' | 'normal' | 'loose';
export type LetterSpacing = 'tight' | 'normal' | 'wide';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type BorderWidth = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type BoxShadow = 'sm' | 'md' | 'lg';
export type BoxDimension = 'auto' | 'none' | 'px' | 'full' | 'screen';
export type Space =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export interface ILayout {
  textSize: { [key in FontSize]?: number | string }; // px

  weight: { [key in FontWeight]?: number };

  leading: { [key in LineHeight]?: number };

  tracking: { [key in LetterSpacing]?: number }; // ems

  radius: { [key in BorderRadius]?: number | string }; // px

  border: { [key in BorderWidth]?: number | string }; // px

  shadow: { [key in BoxShadow]?: string };

  space: { [key in Space]?: number | string }; // px

  height?: { [key in BoxDimension]?: number | string };

  width?: { [key in BoxDimension]?: number | string };
}
```
