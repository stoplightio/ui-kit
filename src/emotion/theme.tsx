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
    ThemeProvider: ThemeProvider as React.FunctionComponent<IThemeProvider<S>>,
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
    link: string;
  };

  button: {
    fg: string;
    bg: string;
    hoverBg: string;
  };

  input: {
    fg: string;
    bg?: string;
    borderColor?: string;
  };

  codeEditor: {
    bg: string;
    border: string;

    syntax: {
      primary: string;
      secondary: string;
      comment: string;
      punctuation: string;
      keyword: string;
      function: string;
      variable: string;
      operator: string;
      regex: string;
    };
  };

  link: {
    fg: string;
    hoverFg?: string;
    visitedFg?: string;
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
      link: '#add8e6',
    },

    button: {
      fg: 'white',
      bg: 'rgba(255, 255, 255, 0.2)',
      hoverBg: 'rgba(255, 255, 255, 0.3)',
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

    input: {
      fg: '#fff',
      bg: '#222',
    },

    link: {
      fg: '#add8e6',
    },
  },

  light: {
    base: 'light',

    canvas: {
      fg: '#111',
      bg: '#eee',
      link: '#72bcd4',
    },

    button: {
      fg: 'white',
      bg: 'rgba(0, 0, 0, 0.5)',
      hoverBg: 'rgba(0, 0, 0, 0.6)',
    },

    codeEditor: {
      bg: 'white',
      border: 'grey',

      syntax: {
        primary: '#e91e63',
        secondary: '#4caf50',
        comment: '#90a4ae',
        punctuation: '#9e9e9e',
        keyword: '#3f51b5',
        function: '#f44336',
        variable: '#ff9800',
        operator: '#795548',
        regex: '#ff9800',
      },
    },

    input: {
      fg: '#222',
      bg: '#fff',
    },

    link: {
      fg: '#72bcd4',
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
export const ThemeProvider: React.FunctionComponent<IThemeProvider<any>> = ({ children, theme, zones = {} }) => {
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
  extends React.FunctionComponent<{
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
