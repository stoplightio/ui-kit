import * as cn from 'classnames';
import * as React from 'react';

/**
 * THEME CONTAINER
 */

interface IThemeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  namespace: string;
  dark?: boolean;
}

const ThemeContainer: React.FunctionComponent<IThemeContainerProps> = props => {
  const { namespace, dark, children } = props;

  const ns = namespace || process.env.BLUEPRINT_NAMESPACE || 'bp3';

  return <div className={cn(ns, `${ns}-tw`, dark && `${ns}-dark`)}>{children}</div>;
};

/**
 * EXPORTS
 */
export { ThemeContainer, IThemeContainerProps };
