import { ISwitchProps as BPToggleProps, Switch as BPToggle } from '@blueprintjs/core';
import * as React from 'react';

interface IToggle extends BPToggleProps {}
const Toggle: React.FunctionComponent<IToggle> = props => {
  return <BPToggle {...props} />;
};

export { IToggle, Toggle };
