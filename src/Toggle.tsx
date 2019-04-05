import { ISwitchProps as BPToggleProps, Switch as BPToggle } from '@blueprintjs/core';
import * as React from 'react';

/**
 * TOGGLE
 */
interface IToggle extends BPToggleProps {}
const Toggle: React.FunctionComponent<IToggle> = props => {
  return <BPToggle {...props} />;
};

/**
 * EXPORTS
 */
export { IToggle, Toggle };
