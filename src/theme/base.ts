import { IBase } from '../types';

// values taken from tailwind.config in @stoplight/core
// https://github.com/stoplightio/core/blob/master/tailwind.config.js
export const base: IBase = {
  textSize: {
    xs: 9,
    sm: 11,
    md: 13,
    lg: 16,
    xl: 20,
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },

  weight: {
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 900,
  },

  leading: {
    reset: 0,
    none: 1,
    tight: 1.25,
    normal: 1.5,
    loose: 1.75,
  },

  tracking: {
    tight: -0.05, // em unit
    normal: 0,
    wide: 0.05,
  },

  border: {
    none: '0px', // need to use a string value since 0 is a falsy value
    xs: 1,
    sm: 2,
    md: 4,
    lg: 8,
  },

  radius: {
    none: '0px',
    sm: 1,
    md: 3,
    lg: 4,
    xl: 6,
    full: 9999,
  },

  space: {
    none: '0px',
    xs: 2,
    sm: 4,
    md: 6,
    lg: 10,
    xl: 13,
    '2xl': 20,
    '3xl': 26,
    '4xl': 32,
    '5xl': '3rem',
    '6xl': '3.5rem',
  },

  height: {
    auto: 'auto',
    none: '0px',
    px: '1px',

    full: '100%',
    screen: '100vh',
  },

  width: {
    auto: 'auto',
    none: '0px',
    px: '1px',

    full: '100%',
    screen: '100vw',
  },
};
