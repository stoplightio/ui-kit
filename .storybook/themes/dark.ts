import { IThemeInterface } from '../../src/types';

type TSections = 'header' | 'sidebar' | 'main' | 'footer';

export const dark: Partial<IThemeInterface<TSections>> = {
  colors: {
    fg: 'white',
    bg: '#111',
    lightest: '#f9f9f9',
    lighter: 'rgba(255, 255, 255, 0.2)',
    error: '#ff7979',
  },

  components: {
    button: {
      bg: 'rgb(255, 255, 255, 0.25)',
      fg: 'white',
      border: 'rgb(160, 159, 165)',
    },
  },

  sections: {
    header: {
      colors: {
        bg: 'RGB(60, 60, 60)',
        fg: 'white',
        border: 'transparent',
      },

      components: {
        button: {
          bg: 'rgba(255, 255, 255, 0.2)',
          fg: 'rgba(255, 255, 255, 0.75)',
          border: 'transparent',
        },
      },
    },

    sidebar: {
      colors: {
        bg: 'rgb(37, 37, 38)',
        fg: 'white',
        border: 'transparent',
      },
    },

    main: {
      colors: {
        bg: 'rgb(37, 41, 44)',
        fg: 'white',
      },
    },

    footer: {
      colors: {
        bg: 'RGB(60, 60, 60)',
        fg: 'white',
        border: 'transparent',
      },
    },
  },
};
