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
  invalidBg: 'rgba(200,0,0,0.15)',
  invalidBorder: 'darkred',
};

const buttonTheme: ITheme['button'] = {
  fg: 'white',
  bg: 'rgba(255, 255, 255, 0.2)',
  border: opacityBorder,
  hoverBg: 'rgba(255, 255, 255, 0.3)',
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

  button: buttonTheme,

  blockQuote: {
    bg: '#093e6f',
    border: '#247aca',
    shadow: '0 0 1px rgba(72, 164, 249, 0.15)',
  },

  checkbox: checkboxTheme,

  code: {
    bg: '#333',
    border: '#f9f9f9',

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
    fg: '#add8e6',
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
    fg: 'white',
    border: 'white',
    shadow: '0 0 10px 1px rgba(255,255,255,0.6) inset',
  },

  textarea: inputTheme,

  tabs: {
    fg: '#f6f6f6',
    bg: '#636363',
    border: '#a9a5a5',

    selectedFg: '#fff',
    selectedBg: '#111',
  },

  toggle: {
    ...checkboxTheme,
    bg: 'gainsboro',
  },
};
