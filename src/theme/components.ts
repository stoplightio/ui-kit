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

export const scrollbars = {
  scrollbars: {
    width: '10px',
    thumb: 'grey',
    thumbRadius: '5px',
  },
};

// default color stylings we want to use out of the gates (in case someone does not want to have to create their own theme)
export const components: ISectionTheme = {
  components: {
    button: {
      fg: 'white',
      bg: 'grey',
      border: '#/colors/transparent',
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

    blockQuote: {
      shadow: '0 0 5px currentColor',
    },

    select: {
      fg: 'black',
      bg: 'white',
      border: 'black',

      indicator: {
        fg: 'black',
        bg: 'white',
      },

      chip: {
        fg: 'black',
        bg: 'lightgrey',
      },

      menu: {
        fg: 'black',
        bg: 'white',

        selected: {
          fg: 'white',
          bg: 'dodgerblue',
        },
      },
    },
  },
};
