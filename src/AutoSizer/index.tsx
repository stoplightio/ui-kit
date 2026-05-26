import * as React from 'react';
import VirtualizedSizer from 'react-virtualized-auto-sizer';

/**
 * AUTOSIZER
 */

export const AutoSizer: React.FunctionComponent<React.ComponentProps<typeof VirtualizedSizer>> = props => (
  <VirtualizedSizer {...props} />
);
