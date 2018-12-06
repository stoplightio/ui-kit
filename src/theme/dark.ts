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

  textarea: {
    fg: '#fff',
    bg: '#222',
  },
};
