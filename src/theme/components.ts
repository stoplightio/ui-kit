import { ISectionTheme } from '../types';

// add whatever prepackaged colors we might want to include here
export const colors = {
  colors: {
    fg: 'black',
    bg: 'white',
    link: '#1E90FF',
    border: 'black',

    transparent: 'transparent',
  },
};

export const shadows = {
  shadows: {
    sm: '0 0 2px rgba(0, 0, 0, .6)',
    md: '0 0 5px rgba(0, 0, 0, .5)',
    lg: '0 0 8px rgba(0, 0, 0, .4)',
  },
};

// default color stylings we want to use out of the gates (in case someone does not want to have to create their own theme)
export const components: ISectionTheme = {
  components: {
    blockQuote: {
      shadow: '0 0 5px currentColor',
    },

    button: {
      fg: 'white',
      bg: 'grey',
      border: '#/colors/transparent',
    },

    codeEditor: {
      bg: 'white',
      fg: 'grey',
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
      bg: 'white',
      border: 'xs',
      borderColor: 'lightgrey',

      hover: {
        bg: 'dodgerblue',
        color: 'white',
      },
    },

    toggle: {
      fg: 'white',
      bg: 'darkgrey',
      border: 'transparent',

      checked: {
        fg: 'white',
        bg: 'mediumseagreen',
        border: 'transparent',
      },
    },

    scrollbar: {
      bg: 'hsla(0, 0%, 27%, 0.84)',
    },

    select: {
      fg: 'hsl(0, 0%, 20%)',
      bg: 'hsl(0, 0%, 100%)',
      border: 'hsl(0, 0%, 80%)',

      chip: {
        bg: 'hsl(0, 0%, 90%)',
      },

      options: {
        fg: 'hsl(0, 0%, 60%)',

        selectedbg: '#2684FF',
        activebg: '#B2D4FF',
        hoverbg: '#DEEBFF',
      },
    },
  },
};
