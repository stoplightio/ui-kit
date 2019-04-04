import { IOverlayProps as BPOverlayProps, Overlay as BPOverlay } from '@blueprintjs/core';
import * as React from 'react';

interface IOverlay extends BPOverlayProps {}
const Overlay: React.FunctionComponent<IOverlay> = props => {
  return <BPOverlay {...props} />;
};

export { IOverlay, Overlay };
