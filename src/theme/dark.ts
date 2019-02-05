import { ITheme } from './types';

export const darkTheme: ITheme = {
  base: 'dark',

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
    checked: 'mediumseagreen',
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
  },

  dialog: {
    bg: '#222',
    fg: '#fff',
    border: '',
  },

  input: {
    fg: '#f5f8fa',
    bg: 'rgba(92, 92, 92, 0.5)',
    border: 'rgba(16,22,26,.2)',
  },

  link: {
    fg: '#add8e6',
  },

  menu: {
    fg: 'white',
    bg: '#222',
    border: 'lightgrey',
    hoverBg: 'dodgerblue',
  },

  overlay: {
    bg: 'rgba(255, 255, 255, 0.4)',
  },

  scrollbar: {
    bg: 'rgba(255, 255, 255, 0.7)',
  },

  select: {
    fg: '#BFCCD6',
    bg: '#202D36',
    border: '#1B262E',

    chip: {
      fg: '#BFCCD6',
      bg: '#384854',
    },

    menu: {
      fg: '#BFCCD6',
      bg: '#202D36',
      border: '',

      hoverBg: '#DEEBFF',
      selectedBg: '#193d6b',
    },
  },

  table: {
    fg: 'white',
    border: 'white',
    shadow: '0 0 10px 1px rgba(255,255,255,0.6) inset',
  },

  textarea: {
    fg: '#f5f8fa',
    bg: 'rgba(92, 92, 92, 0.5)',
    border: 'rgba(16,22,26,.2)',
  },

  toggle: {
    fg: 'white',
    bg: 'darkgrey',
    border: 'transparent',
    checked: 'mediumseagreen',
  },
};
