import { createThemedModule } from '../src/theme';

const { useTheme, ThemeProvider } = createThemedModule();

export { useTheme, ThemeProvider };

export const themes = ['dark', 'light'];

export const zones = {};
