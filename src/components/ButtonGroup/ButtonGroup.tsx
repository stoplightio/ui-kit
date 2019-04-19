import { ButtonGroup as BPButtonGroup, IButtonGroupProps as BPButtonGroupProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * BUTTON GROUP
 */
interface IButtonGroupProps extends BPButtonGroupProps {}

const ButtonGroup: React.FunctionComponent<IButtonGroupProps> = props => {
  return <BPButtonGroup {...props} />;
};

/**
 * EXPORTS
 */
export { ButtonGroup, IButtonGroupProps };
