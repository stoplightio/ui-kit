import { IOverlayProps as BPOverlayProps, Overlay as BPOverlay } from '@blueprintjs/core';
import * as React from 'react';

/**
 * OVERLAY
 */
interface IOverlayProps extends BPOverlayProps {}

const Overlay: React.FunctionComponent<IOverlayProps> = props => {
  return <BPOverlay {...props} />;
};

/**
 * EXPORTS
 */
export { IOverlayProps, Overlay };
