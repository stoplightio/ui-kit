import { ISwitchProps as BPSwitchProps, Switch as BPSwitch } from '@blueprintjs/core';
import * as React from 'react';

/**
 * Switch
 */
interface ISwitchProps extends BPSwitchProps {}

const Switch: React.FunctionComponent<ISwitchProps> = props => {
  return <BPSwitch {...props} />;
};

/**
 * EXPORTS
 */
export { ISwitchProps, Switch };
