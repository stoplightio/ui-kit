import cn from 'classnames';
import * as React from 'react';

/**
 * THEME CONTAINER
 */

interface IThemeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  namespace?: string;
  dark?: boolean;
}

const ThemeContainer: React.FunctionComponent<IThemeContainerProps> = props => {
  const { namespace, dark, children } = props;

  const bp_namespace = process.env.BLUEPRINT_NAMESPACE || 'bp3';

  return <div className={cn(namespace, bp_namespace, dark && `${bp_namespace}-dark`, 'h-full w-full')}>{children}</div>;
};

/**
 * EXPORTS
 */
export { ThemeContainer, IThemeContainerProps };
