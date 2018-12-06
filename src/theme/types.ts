import { DeepPartial } from '@stoplight/types';

/**
 * Theme
 */

export type BaseTheme = 'dark' | 'light';

export interface ITheme {
  base: BaseTheme;

  canvas: {
    fg: string;
    bg: string;
    link: string;
  };

  checkbox: {
    fg: string;
    bg: string;
    checkedBg: string;
  };

  blockQuote: {
    fg?: string;
    bg?: string;
    borderColor: string;
    shadow: string;
  };

  button: {
    fg: string;
    bg: string;
    hoverBg: string;
  };

  input: {
    fg: string;
    bg?: string;
    borderColor?: string;
  };

  codeEditor: {
    bg: string;
    border: string;

    syntax: {
      primary: string;
      secondary: string;
      comment: string;
      punctuation: string;
      keyword: string;
      function: string;
      variable: string;
      operator: string;
      regex: string;
    };
  };

  link: {
    fg: string;
    hoverFg?: string;
    visitedFg?: string;
  };

  table: {
    fg: string;
    bg?: string;
    borderColor: string;
    shadow: string;
  };

  textarea: {
    fg: string;
    bg?: string;
    borderColor?: string;
  };

  toggle: {
    fg: string;
    bg: string;
    borderColor: string;
    checkedFg: string;
    checkedBg: string;
    checkedBorderColor: string;
  };
}

/**
 * This is what the library user can pass to ThemeProvider.
 *
 * Any properties they define will be merged into their chosen base theme.
 */
export interface ICustomTheme extends DeepPartial<ITheme> {
  base: BaseTheme;
}
