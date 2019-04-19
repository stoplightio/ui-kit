import { ControlGroup as BPControlGroup, IControlGroupProps as BPControlGroupProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * Control Group
 */
interface IControlGroupProps extends BPControlGroupProps {}

const ControlGroup: React.FunctionComponent<IControlGroupProps> = props => {
  return <BPControlGroup {...props} />;
};

/**
 * EXPORTS
 */
export { ControlGroup, IControlGroupProps };
