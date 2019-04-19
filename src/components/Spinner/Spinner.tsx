import { ISpinnerProps as BPSpinnerProps, Spinner as BPSpinner } from '@blueprintjs/core';
import * as React from 'react';

/**
 * Spinner
 */
interface ISpinnerProps extends BPSpinnerProps {}

const Spinner: React.FunctionComponent<ISpinnerProps> = props => {
  return <BPSpinner {...props} />;
};

/**
 * EXPORTS
 */
export { Spinner, ISpinnerProps };
