import { Callout as BPCallout, ICalloutProps as BPCalloutProps } from '@blueprintjs/core';
import * as React from 'react';

interface ICallout extends BPCalloutProps {}
const Callout: React.FunctionComponent<ICallout> = props => {
  return <BPCallout {...props} />;
};

export { ICallout, Callout };
