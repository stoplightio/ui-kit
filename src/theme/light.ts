import { ITheme } from './types';

/**
 * CONSTANTS/HELPERS
 */

const opacityBorder = 'rgba(16,22,26,.15)';

const inputTheme: ITheme['input'] = {
  fg: '#222',
  bg: '#fff',
  border: opacityBorder,
  invalid: 'red',
};

const checkboxTheme: ITheme['checkbox'] = {
  fg: 'white',
  bg: 'rgb(245, 248, 250)',
  border: opacityBorder,
  checked: 'steelblue',
  invalid: 'red',
};

const menuTheme: ITheme['menu'] = {
  fg: '#111',
  bg: '#fff',
  border: opacityBorder,
  hoverBg: 'rgba(167,182,194,.3)',
};

/**
 * THEME
 */
export const lightTheme: ITheme = {
  base: 'light',

  button: {
    fg: 'black',
    bg: 'rgb(245, 248, 250)',
    border: opacityBorder,
    hoverBg: '#ebf1f5',
  },

  blockQuote: {
    fg: '#111',
    border: '#111',
    shadow: '0 0 5px rgba(0, 0, 0, 0.3)',
  },

  checkbox: checkboxTheme,

  codeEditor: {
    bg: '#f9f9f9',
    border: 'grey',

    syntax: {
      primary: '#e91e63',
      secondary: '#4caf50',
      comment: '#90a4ae',
      punctuation: '#9e9e9e',
      keyword: '#3f51b5',
      function: '#f44336',
      variable: '#ff9800',
      operator: '#795548',
      regex: '#ff9800',
    },
  },

  contextMenu: menuTheme,

  dialog: {
    bg: '#fff',
    fg: '#111',
  },

  input: inputTheme,

  link: {
    fg: '#72bcd4',
  },

  menu: menuTheme,

  overlay: {
    bg: 'rgba(0, 0, 0, 0.4)',
  },

  scrollbar: {
    bg: 'hsla(0, 0%, 27%, 0.84)',
  },

  select: {
    ...inputTheme,

    menu: {
      ...menuTheme,
      selectedBg: '#B2D4FF',
    },

    chip: {
      fg: 'black',
      bg: opacityBorder,
    },
  },

  table: {
    fg: '#111',
    border: '#111',
    shadow: '0 0 8px 1px rgba(0, 0, 0, 0.6) inset',
  },

  textarea: inputTheme,

  tabs: {
    fg: '#222',
    bg: '#fff',
    border: '#aaa',
    disabledFg: 'GrayText',
  },

  toggle: {
    ...checkboxTheme,
    bg: 'gainsboro',
  },
};
