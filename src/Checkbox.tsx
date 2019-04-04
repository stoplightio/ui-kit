import { Checkbox as BPCheckbox, ICheckboxProps as BPCheckboxProps } from '@blueprintjs/core';
import * as React from 'react';

interface ICheckbox extends BPCheckboxProps {}
const Checkbox: React.FunctionComponent<ICheckbox> = props => {
  return <BPCheckbox {...props} />;
};

export { ICheckbox, Checkbox };
