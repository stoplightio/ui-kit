import { Drawer as BPDrawer, IDrawerProps as BPDrawerProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * Drawer
 */
interface IDrawerProps extends BPDrawerProps {}

const Drawer: React.FunctionComponent<IDrawerProps> = props => {
  return <BPDrawer {...props} />;
};

/**
 * EXPORTS
 */
export { Drawer, IDrawerProps };
