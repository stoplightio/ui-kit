import { Callout as BPCallout, ICalloutProps as BPCalloutProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * CALLOUT
 */
interface ICalloutProps extends BPCalloutProps {}

const Callout: React.FunctionComponent<ICalloutProps> = props => {
  return <BPCallout {...props} />;
};

/**
 * EXPORTS
 */
export { Callout, ICalloutProps };
