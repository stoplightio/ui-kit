import * as React from 'react';
import VirtualizedSizer, { AutoSizerProps } from 'react-virtualized-auto-sizer';

/**
 * AUTOSIZER
 */

// we wrap autosize to ensure that that the parent container will always have a height!!
export const AutoSizer: React.FunctionComponent<AutoSizerProps> = props => (
  <div className="flex h-full">
    <div className="flex-auto">
      <VirtualizedSizer {...props} />
    </div>
  </div>
);
