import { ITheme } from './types';

export const lightTheme: ITheme = {
  base: 'light',

  canvas: {
    fg: '#111',
    bg: 'white',
    link: '#72bcd4',
  },

  button: {
    fg: 'white',
    bg: 'rgba(0, 0, 0, 0.5)',
    hoverBg: 'rgba(0, 0, 0, 0.6)',
  },

  blockQuote: {
    fg: '#111',
    borderColor: '#111',
    shadow: '0 0 5px rgba(0, 0, 0, 0.3)',
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

  input: {
    fg: '#222',
    bg: '#fff',
  },

  link: {
    fg: '#72bcd4',
  },

  table: {
    fg: '#111',
    borderColor: '#111',
    shadow: '0 0 8px 1px rgba(0, 0, 0, 0.6) inset',
  },

  textarea: {
    fg: '#222',
    bg: '#fff',
  },
};
