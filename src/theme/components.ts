import { ISectionTheme } from '../types';

// add whatever prepackaged colors we might want to include here
export const colors = {
  colors: {
    fg: 'black',
    bg: 'white',
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
  },
};
