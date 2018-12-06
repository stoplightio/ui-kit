import { ITheme } from './types';

export const lightTheme: ITheme = {
  base: 'light',

  canvas: {
    fg: '#111',
    bg: '#eee',
    link: '#72bcd4',
  },

  button: {
    fg: 'white',
    bg: 'rgba(0, 0, 0, 0.5)',
    hoverBg: 'rgba(0, 0, 0, 0.6)',
  },

  codeEditor: {
    bg: 'white',
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

  textarea: {
    fg: '#222',
    bg: '#fff',
  },
};
