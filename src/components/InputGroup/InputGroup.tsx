import { IInputGroupProps as BPInputGroupProps, InputGroup as BPInputGroup } from '@blueprintjs/core';
import * as React from 'react';

/**
 * InputGroup
 */
interface IInputGroupProps extends BPInputGroupProps {}

const InputGroup: React.FunctionComponent<IInputGroupProps> = props => {
  return <BPInputGroup {...props} />;
};

/**
 * EXPORTS
 */
export { InputGroup, IInputGroupProps };
