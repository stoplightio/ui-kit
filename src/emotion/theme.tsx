import { DeepPartial, Dictionary, Omit } from '@stoplight/types';
import merge = require('lodash/merge');
import * as React from 'react';

export type BaseTheme = 'dark' | 'light';

/**
 * Every app should export the result of this function once, and re-use these values.
 *
 * This enables typings for zones.
 */
export function createThemedModule<S extends string>() {
  return {
    ThemeProvider: ThemeProvider as React.SFC<IThemeProvider<S>>,
    ThemeZone: ThemeZone as IThemeZone<S>,
    useTheme,
    useThemeZones: useThemeZones as () => ThemeZones<S>,
  };
}

/**
 * Theme
 */

interface ITheme {
  base: BaseTheme;

  canvas: {
    fg: string;
    bg: string;
  };

  button: {
    fg: string;
    bg: string;
    hoverBg: string;
  };
}

/**
 * This is what the library user can pass to ThemeProvider.
 *
 * Any properties they define will be merged into their chosen base theme.
 */
export interface ICustomTheme extends DeepPartial<ITheme> {
  base: BaseTheme;
}

/** Our base themes. These are not exported - the end user should just set the 'base' property on their ICustomTheme */
const baseThemes: Dictionary<ITheme, BaseTheme> = {
  dark: {
    base: 'dark',

    canvas: {
      fg: 'white',
      bg: '#222',
    },

    button: {
      fg: 'white',
      bg: 'rgba(255, 255, 255, 0.2)',
      hoverBg: 'rgba(255, 255, 255, 0.3)',
    },
  },

  light: {
    base: 'light',

    canvas: {
      fg: '#111',
      bg: '#eee',
    },

    button: {
      fg: 'white',
      bg: 'rgba(0, 0, 0, 0.5)',
      hoverBg: 'rgba(0, 0, 0, 0.6)',
    },
  },
};

const defaultTheme = baseThemes.light;

/**
 * ThemeProvider
 */

const Theme = React.createContext<ITheme>(defaultTheme);
export const useTheme = () => React.useContext(Theme);

export interface IThemeProvider<S extends string> {
  theme?: ICustomTheme;
  zones?: ThemeZones<S>;
}

/** The primary theme provider. Every app should render this once, towards the top of the react component tree. */
export const ThemeProvider: React.SFC<IThemeProvider<any>> = ({ children, theme, zones = {} }) => {
  const targetTheme = theme || defaultTheme;

  return (
    <Theme.Provider value={merge({}, baseThemes[targetTheme.base], targetTheme)}>
      <ThemeZones.Provider value={zones}>{children}</ThemeZones.Provider>
    </Theme.Provider>
  );
};

/**
 * ThemeZone
 */

const ThemeZones = React.createContext<ThemeZones<any>>({});
export const useThemeZones = () => React.useContext(ThemeZones);

export type ThemeZoneObj = Omit<ICustomTheme, 'base'>;
export type ThemeZone = ThemeZoneObj | ((parentTheme: ITheme) => ThemeZoneObj);
export type ThemeZones<S extends string> = Dictionary<ThemeZone, S>;

export interface IThemeZone<S extends string>
  extends React.SFC<{
      name: S;
    }> {}

export const ThemeZone: IThemeZone<any> = ({ children, name }) => {
  const parentTheme = useTheme();
  const zones = useThemeZones();
  const zoneTheme = zones[name] || {};

  return (
    <Theme.Provider
      value={merge({}, parentTheme, typeof zoneTheme === 'function' ? zoneTheme(parentTheme) : zoneTheme)}
    >
      {children}
    </Theme.Provider>
  );
};
