import { ITheme } from './types';

export const darkTheme: ITheme = {
  base: 'dark',

  container: {
    fg: 'white',
    bg: '#222',
    border: 'white',
  },

  button: {
    fg: 'white',
    bg: 'rgba(255, 255, 255, 0.2)',
    hoverBg: 'rgba(255, 255, 255, 0.3)',
  },

  blockQuote: {
    fg: 'white',
    border: 'white',
    shadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  },

  checkbox: {
    fg: 'white',
    bg: 'white',
    checkedBg: 'mediumseagreen',
  },

  codeEditor: {
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

  contextMenu: {
    fg: 'white',
    bg: '#222',
    border: 'lightgrey',
    hoverBg: 'dodgerblue',
    hoverFg: 'white',
  },

  input: {
    fg: '#fff',
    bg: '#222',
  },

  link: {
    fg: '#add8e6',
  },

  menu: {
    fg: 'white',
    bg: '#222',
    border: 'lightgrey',
    hoverBg: 'dodgerblue',
    hoverFg: 'white',
  },

  scrollbar: {
    bg: 'rgba(255, 255, 255, 0.4)',
  },

  select: {
    fg: '#BFCCD6',
    bg: '#202D36',
    border: '#1B262E',

    chip: {
      fg: '#BFCCD6',
      bg: '#384854',
    },

    indicator: {
      fg: 'grey',
    },

    menu: {
      fg: '#BFCCD6',
      bg: '#202D36',

      selectedFg: '#BFCCD6',
      selectedBg: '#193d6b',

      activeFg: 'black',
      activeBg: '#B2D4FF',

      hoverFg: 'black',
      hoverBg: '#DEEBFF',
    },
  },

  table: {
    fg: 'white',
    border: 'white',
    shadow: '0 0 10px 1px rgba(255,255,255,0.6) inset',
  },

  textarea: {
    fg: '#fff',
    bg: '#222',
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
