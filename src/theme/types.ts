import { DeepPartial } from '@stoplight/types';

/**
 * Theme
 */

export type BaseTheme = 'dark' | 'light';

export interface ITheme {
  base: BaseTheme;

  checkbox: {
    fg: string;
    bg: string;
    checkedBg: string;
  };

  contextMenu: {
    fg: string;
    bg: string;
    border: string;
    hoverFg: string;
    hoverBg: string;
  };

  blockQuote: {
    fg?: string;
    bg?: string;
    border: string;
    shadow: string;
  };

  button: {
    fg: string;
    bg: string;
    hoverBg: string;
  };

  dialog: {
    bg: string;
    fg: string;
    border?: string;
  };

  input: {
    fg: string;
    bg?: string;
    border?: string;
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

  scrollbar: {
    bg: string;
  };

  menu: {
    fg: string;
    bg: string;
    border: string;
    hoverFg: string;
    hoverBg: string;
  };

  overlay: {
    bg?: string;
  };

  select: {
    fg: string;
    bg: string;
    border: string;

    chip: {
      fg: string;
      bg: string;
    };

    indicator: {
      fg: string;
    };

    menu: {
      fg: string;
      bg: string;

      selectedFg: string;
      selectedBg: string;

      activeFg: string;
      activeBg: string;

      hoverFg: string;
      hoverBg: string;
    };
  };

  table: {
    fg: string;
    bg?: string;
    border: string;
    shadow: string;
  };

  textarea: {
    fg: string;
    bg?: string;
    border?: string;
  };

  toggle: {
    fg: string;
    bg: string;
    border: string;
    checkedFg: string;
    checkedBg: string;
    checkedBorder: string;
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
