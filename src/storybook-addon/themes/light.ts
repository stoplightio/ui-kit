export const light = {
  colors: {
    fg: 'black',
    bg: 'white',
    lightest: '#f9f9f9',
    lighter: 'rgba(255, 255, 255, 0.2)',
    error: '#ff7979',
    success: '#4caf50',
    warning: '#ff9800',
  },

  components: {
    button: {
      bg: 'rgb(160, 159, 165)',
      fg: 'white',
      border: 'rgb(160, 159, 165)',
    },

    slateEditor: {
      blockQuote: {
        shadow: '0 0 5px currentColor',
      },
    },
  },

  sections: {
    header: {
      colors: {
        bg: 'rgb(245, 247, 249)',
        border: 'rgb(233, 239, 244)',
      },
      components: {
        button: {
          bg: 'white',
          fg: '#888',
          border: 'rgb(218, 218, 220)',
        },
      },
    },

    sidebar: {
      colors: {
        bg: 'rgb(245, 247, 249)',
        fg: 'black',
        border: 'rgb(233, 239, 244)',
      },
    },

    main: {
      colors: {
        bg: 'white',
        fg: 'black',
      },
    },

    footer: {
      colors: {
        bg: 'rgb(245, 247, 249)',
        border: 'rgb(233, 239, 244)',
      },
    },
  },
};
