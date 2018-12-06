import { ITheme } from './types';

export const darkTheme: ITheme = {
  base: 'dark',

  canvas: {
    fg: 'white',
    bg: '#222',
    link: '#add8e6',
  },

  button: {
    fg: 'white',
    bg: 'rgba(255, 255, 255, 0.2)',
    hoverBg: 'rgba(255, 255, 255, 0.3)',
  },

  blockQuote: {
    fg: 'white',
    borderColor: 'white',
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

  input: {
    fg: '#fff',
    bg: '#222',
  },

  link: {
    fg: '#add8e6',
  },

  table: {
    fg: 'white',
    borderColor: 'white',
    shadow: '0 0 10px 1px rgba(255,255,255,0.6) inset',
  },

  textarea: {
    fg: '#fff',
    bg: '#222',
  },

  toggle: {
    fg: 'white',
    bg: 'darkgrey',
    borderColor: 'transparent',
    checkedFg: 'white',
    checkedBg: 'mediumseagreen',
    checkedBorderColor: 'transparent',
  },
};
