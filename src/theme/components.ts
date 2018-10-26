import { ISectionTheme } from 'src/types';

// add whatever prepackaged colors we might want to include here
export const colors = {
  colors: {
    fg: 'black',
    bg: 'white',
    border: 'black',

    transparent: 'transparent',
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
  },
};