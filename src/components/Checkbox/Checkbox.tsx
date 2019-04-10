import { Checkbox as BPCheckbox, ICheckboxProps as BPCheckboxProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * CHECKBOX
 */
interface ICheckboxProps extends BPCheckboxProps {}

const Checkbox: React.FunctionComponent<ICheckboxProps> = props => {
  return <BPCheckbox {...props} />;
};

/**
 * EXPORTS
 */
export { Checkbox, ICheckboxProps };
