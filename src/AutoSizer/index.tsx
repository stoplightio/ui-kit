import * as React from 'react';
import VirtualizedSizer, { AutoSizerProps } from 'react-virtualized-auto-sizer';

/**
 * AUTOSIZER
 */

export const AutoSizer: React.FunctionComponent<AutoSizerProps> = props => <VirtualizedSizer {...props} />;
