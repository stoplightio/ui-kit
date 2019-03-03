import { DeepPartial } from '@stoplight/types';

/**
 * Theme
 */

export type BaseTheme = 'dark' | 'light';

// interface IThemeColor {
//   light: string;
//   normal: string;
//   dark: string;
// }

// interface IThemeColor {
//   fg: IThemeColor;
//   bg: IThemeColor;
//   border: IThemeColor;
// }

// export interface IThemeColors {
//   default: IThemeColor;
//   primary: IThemeColor;
//   accent: IThemeColor;
//   active: IThemeColor;
//   success: IThemeColor;
//   warning: IThemeColor;
//   error: IThemeColor;
//   info: IThemeColor;
// }

// export interface ITheme {
//   base: BaseTheme;
//   colors: IThemeColors;
//   inlineCode: IThemeColor;
//   code: {
//     syntax: {
//       primary: string;
//       secondary: string;
//       comment: string;
//       punctuation: string;
//       keyword: string;
//       function: string;
//       variable: string;
//       operator: string;
//       regex: string;
//     };
//   };
// }

export interface ITheme {
  base: BaseTheme;

  badge: {
    default: {
      fg: string;
      bg: string;
    };
    warning: {
      fg: string;
      bg: string;
    };
    error: {
      fg: string;
      bg: string;
    };
  };

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
    bg?: string;
    hoverFg?: string;
    visitedFg?: string;
    hoverBg?: string;
    border?: string;
    hoverBorder?: string;
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
    evenBg: string;
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

  toast: {
    toastFg: string;
    toastBg: string;
    progressBg: string;
    warningFg: string;
    infoFg: string;
    defaultFg: string;
    errorFg: string;
    successFg: string;
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
