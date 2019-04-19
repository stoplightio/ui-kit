import { FormGroup as BPFormGroup, IFormGroupProps as BPFormGroupProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * Form Group
 */
interface IFormGroupProps extends BPFormGroupProps {}

const FormGroup: React.FunctionComponent<IFormGroupProps> = props => {
  return <BPFormGroup {...props} />;
};

/**
 * EXPORTS
 */
export { FormGroup, IFormGroupProps };
