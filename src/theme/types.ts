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

  textarea: {
    fg: string;
    bg?: string;
    borderColor?: string;
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
