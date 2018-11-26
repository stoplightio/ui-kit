export const dark = {
  colors: {
    fg: 'white',
    bg: '#222',
    border: '#f9f9f9',
    lightest: '#f9f9f9',
    lighter: 'rgba(255, 255, 255, 0.2)',
    error: '#ff7979',
    success: '#4caf50',
    warning: '#ff9800',
  },

  shadows: {
    sm: '0 0 2px rgba(255, 255, 255, .6)',
    md: '0 0 5px rgba(255, 255, 25, .5)',
    lg: '0 0 8px 2px rgba(255, 255, 255, .8)',
  },

  components: {
    button: {
      bg: 'rgb(255, 255, 255, 0.25)',
      fg: 'white',
      border: 'rgb(160, 159, 165)',
    },

    codeEditor: {
      bg: '#222',
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

    contextMenu: {
      bg: 'black',
      borderColor: 'rgba(255, 255, 255, 0.5)',

      hover: {
        bg: 'dodgerblue',
        color: 'white',
      },
    },

    blockQuote: {
      shadow: '0 0 5px currentColor',
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

  scrollbars: {
    width: '7px',
    thumb: '#f9f9f9',
    thumbRadius: '5px',
  },
};
