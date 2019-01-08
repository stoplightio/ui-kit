import { ITheme } from './types';

export const lightTheme: ITheme = {
  base: 'light',

  button: {
    fg: 'white',
    bg: 'rgba(0, 0, 0, 0.5)',
    hoverBg: 'rgba(0, 0, 0, 0.6)',
  },

  blockQuote: {
    fg: '#111',
    border: '#111',
    shadow: '0 0 5px rgba(0, 0, 0, 0.3)',
  },

  checkbox: {
    fg: 'white',
    bg: '#222',
    checkedBg: 'mediumseagreen',
  },

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

  contextMenu: {
    fg: '#111',
    bg: '#fff',
    border: 'lightgrey',
    hoverBg: 'dodgerblue',
    hoverFg: 'white',
  },

  dialog: {
    bg: '#fff',
    fg: '#111',
  },

  input: {
    fg: '#222',
    bg: '#fff',
  },

  link: {
    fg: '#72bcd4',
  },

  menu: {
    fg: 'white',
    bg: '#222',
    border: 'lightgrey',
    hoverBg: 'dodgerblue',
    hoverFg: 'white',
  },

  overlay: {
    bg: 'rgba(0, 0, 0, 0.4)',
  },

  scrollbar: {
    bg: 'hsla(0, 0%, 27%, 0.84)',
  },

  select: {
    fg: 'black',
    bg: 'white',
    border: 'lightgrey',

    chip: {
      fg: 'green',
      bg: 'lightgrey',
    },

    indicator: {
      fg: 'grey',
    },

    menu: {
      fg: 'black',
      bg: 'white',

      selectedFg: 'black',
      selectedBg: '#2684FF',

      activeFg: 'black',
      activeBg: '#B2D4FF',

      hoverFg: 'black',
      hoverBg: '#DEEBFF',
    },
  },

  table: {
    fg: '#111',
    border: '#111',
    shadow: '0 0 8px 1px rgba(0, 0, 0, 0.6) inset',
  },

  textarea: {
    fg: '#222',
    bg: '#fff',
  },

  toggle: {
    fg: 'white',
    bg: 'darkgrey',
    border: 'transparent',
    checkedFg: 'white',
    checkedBg: 'mediumseagreen',
    checkedBorder: 'transparent',
  },
};
