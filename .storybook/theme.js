import { createThemedModule } from '@stoplight/ui-kit';

const { useTheme, ThemeProvider, ThemeZone } = createThemedModule();

export { useTheme, ThemeProvider, ThemeZone };

export const themes = ['dark', 'light'];

export const zones = {};
