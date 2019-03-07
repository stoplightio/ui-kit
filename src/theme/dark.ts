import { ITheme } from './types';

/**
 * CONSTANTS/HELPERS
 */

const opacityBorder = 'rgba(16,22,26,.15)';

const inputTheme: ITheme['input'] = {
  fg: '#f5f8fa',
  bg: 'rgb(65, 65, 65)',
  border: opacityBorder,
  invalidFg: 'red',
  invalidBg: 'rgb(45, 18, 17)',
  invalidBorder: 'darkred',
};

const buttonTheme: ITheme['button'] = {
  fg: 'white',
  bg: 'rgb(65, 65, 65)',
  border: opacityBorder,
  hoverBg: 'rgb(89, 89, 89)',
};

const checkboxTheme: ITheme['checkbox'] = {
  ...buttonTheme,
  fg: 'rgb(65, 65, 65)',
  checked: 'steelblue',
  invalidFg: 'red',
  invalidBg: 'rgb(45, 18, 17)',
  invalidChecked: 'rgb(45, 18, 17)',
  invalidBorder: 'darkred',
};

const menuTheme: ITheme['menu'] = {
  fg: 'white',
  bg: '#222',
  border: opacityBorder,
  hoverBg: 'rgba(167,182,194,.3)',
};

/**
 * THEME
 */
export const darkTheme: ITheme = {
  base: 'dark',

  badge: {
    default: {
      fg: '#fff',
      bg: '#6c757e',
    },
    warning: {
      fg: '#21252a',
      bg: '#ffc108',
    },
    error: {
      fg: '#fff',
      bg: '#dc3546',
    },
  },

  button: buttonTheme,

  blockQuote: {
    bg: '#093e6f',
    border: '#247aca',
    shadow: '0 0 1px rgba(72, 164, 249, 0.15)',
  },

  checkbox: checkboxTheme,

  code: {
    bg: '#28303a',
    border: 'rgb(83, 89, 97)',

    inlineFg: 'inherit',
    inlineBg: 'rgb(77, 77, 77)',

    syntax: {
      primary: '#e91e63',
      secondary: '#4caf50',
      comment: '#c2cbd0',
      punctuation: '#c3c9cc',
      keyword: '#FFFFC7',
      function: '#f44336',
      variable: '#FFFFC7',
      operator: '#795548',
      regex: '#ff9800',
    },
  },

  contextMenu: menuTheme,

  dialog: {
    bg: '#222',
    fg: '#fff',
  },

  input: inputTheme,

  link: {
    fg: '#3498db',
    hoverFg: '#c6f6ff',
  },

  menu: menuTheme,

  overlay: {
    bg: 'rgba(255, 255, 255, 0.4)',
  },

  scrollbar: {
    bg: 'rgba(255, 255, 255, 0.7)',
  },

  select: {
    ...inputTheme,

    menu: {
      ...menuTheme,
      selectedBg: '#193d6b',
    },

    chip: {
      fg: '#BFCCD6',
      bg: buttonTheme.bg,
      border: opacityBorder,
    },
  },

  table: {
    fg: 'inherit',
    border: 'rgb(77, 77, 77)',
    shadow: '0 0 10px 1px rgba(255,255,255,0.6) inset',
    evenBg: 'rgb(29, 29, 29)',
  },

  textarea: inputTheme,

  tabs: {
    bg: '#28303a',
    fg: 'rgb(168, 172, 175)',
    border: 'rgb(65, 65, 65)',
    selectedFg: '#fff',
    selectedBg: '#1b2129',
  },

  toggle: {
    ...checkboxTheme,
    bg: 'gainsboro',
  },

  tooltip: inputTheme,

  toast: {
    toastFg: '#f0f0f0',
    toastBg: '#222',
    progressBg: '#fff',
    warningBg: 'orange',
    infoBg: 'blue',
    defaultBg: 'gray',
    errorBg: 'red',
    successBg: 'green',
  },
};
