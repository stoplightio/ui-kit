import { Omit } from '@stoplight/types';
import * as React from 'react';
import useResizeObserver from 'use-resize-observer';

/**
 * AUTOSIZER
 */
interface IAutoSizerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ({ width, height }: { width: React.ReactText; height: React.ReactText }) => React.ReactNode;
}

const AutoSizer: React.FunctionComponent<IAutoSizerProps> = props => {
  const { children, ...rest } = props;

  // useResizeObserver does not use generics and the typings aren't complete
  const [ref, width = '100%', height = '100%'] = useResizeObserver() as [
    React.RefObject<HTMLDivElement>,
    React.ReactText,
    React.ReactText
  ];

  return (
    <div {...rest} ref={ref}>
      {children({ width, height })}
    </div>
  );
};

/**
 * EXPORTS
 */
export { AutoSizer, IAutoSizerProps };
