import { DeepPartial } from '@stoplight/types';

/**
 * Theme
 */

export type BaseTheme = 'dark' | 'light';

export interface ITheme {
  base: BaseTheme;

  button: {
    fg: string;
    bg: string;
    hoverBg: string;
    border?: string;
  };

  checkbox: {
    fg: string;
    bg: string;
    border?: string;
    checked: string;
    invalidFg?: string;
    invalidBg?: string;
    invalidBorder?: string;
    invalidChecked?: string;
  };

  contextMenu: {
    fg: string;
    bg: string;
    border: string;
    hoverBg: string;
  };

  blockQuote: {
    fg?: string;
    bg: string;
    border: string;
    shadow: string;
  };

  dialog: {
    bg: string;
    fg: string;
    border?: string;
  };

  input: {
    fg: string;
    bg: string;
    border?: string;
    invalidFg?: string;
    invalidBg?: string;
    invalidBorder?: string;
  };

  code: {
    bg: string;
    border: string;

    inlineBg: string;
    inlineFg: string;

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
    hoverBg: string;
  };

  overlay: {
    bg?: string;
  };

  select: {
    fg: string;
    bg: string;
    border?: string;
    invalidFg?: string;
    invalidBg?: string;
    invalidBorder?: string;

    chip: {
      fg: string;
      bg: string;
      border?: string;
    };

    menu: {
      fg: string;
      bg: string;
      border: string;

      hoverBg: string;
      selectedBg: string;
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
    invalidFg?: string;
    invalidBg?: string;
    invalidBorder?: string;
  };

  tabs: {
    fg: string;
    bg: string;
    border: string;

    selectedFg: string;
    selectedBg: string;
  };

  toggle: {
    fg: string;
    bg: string;
    border?: string;
    checked: string;
  };

  tooltip: {
    fg: string;
    bg: string;
    border?: string;
    invalidFg?: string;
    invalidBg?: string;
    invalidBorder?: string;
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
