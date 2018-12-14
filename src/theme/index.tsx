import { Dictionary, Omit } from '@stoplight/types';
import merge = require('lodash/merge');
import * as React from 'react';

import { darkTheme } from './dark';
import { lightTheme } from './light';
import { BaseTheme, ICustomTheme, ITheme } from './types';

export * from './types';

/**
 * Every app should export the result of this function once, and re-use these values.
 *
 * This enables typings for zones.
 */
export function createThemedModule<S extends string, T extends ICustomTheme>() {
  return {
    ThemeProvider: ThemeProvider as React.FunctionComponent<IThemeProvider<S, T>>,
    ThemeZone: ThemeZone as IThemeZone<S>,
    useTheme: useTheme as () => T,
    useThemeZones: useThemeZones as () => ThemeZones<S>,
  };
}

/** Our base themes. These are not exported - the end user should just set the 'base' property on their ICustomTheme */
const baseThemes: Dictionary<ITheme, BaseTheme> = {
  dark: darkTheme,
  light: lightTheme,
};

const defaultTheme = baseThemes.light;

/**
 * ThemeProvider
 */

const Theme = React.createContext(defaultTheme);
export const useTheme = () => React.useContext<ITheme>(Theme);

export interface IThemeProvider<S extends string, T extends ICustomTheme> {
  theme?: T;
  zones?: ThemeZones<S>;
}

/** The primary theme provider. Every app should render this once, towards the top of the react component tree. */
export const ThemeProvider: React.FunctionComponent<IThemeProvider<any, any>> = ({ children, theme, zones = {} }) => {
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
