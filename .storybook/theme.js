import { createThemedModule } from '../src/theme';

const { useTheme, ThemeProvider } = createThemedModule();

export { useTheme, ThemeProvider };

export const themes = ['dark', 'light'];

export const zones = {
  app: ({ base }) => ({
    canvas:
      base === 'light'
        ? {
            fg: '#111',
            bg: '#fff',
          }
        : {
            fg: '#fff',
            bg: '#111',
          },
  }),
  inverted: ({ base }) => ({
    container:
      base === 'dark'
        ? {
            fg: '#111',
            bg: '#fff',
          }
        : {
            fg: '#fff',
            bg: '#111',
          },
  }),
  inner: {
    container: {
      fg: 'white',
      bg: 'purple',
    },
  },
};
