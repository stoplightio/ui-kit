import { INonIdealStateProps as BPNonIdealStateProps, NonIdealState as BPNonIdealState } from '@blueprintjs/core';
import * as React from 'react';

/**
 * NonIdealState
 */
interface INonIdealStateProps extends BPNonIdealStateProps {}

const NonIdealState: React.FunctionComponent<INonIdealStateProps> = props => {
  return <BPNonIdealState {...props} />;
};

/**
 * EXPORTS
 */
export { NonIdealState, INonIdealStateProps };
