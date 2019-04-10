import { IRadioProps as BPRadioProps, Radio as BPRadio } from '@blueprintjs/core';
import * as React from 'react';

/**
 * RADIO
 */
interface IRadioProps extends BPRadioProps {}

const Radio: React.FunctionComponent<IRadioProps> = props => {
  return <BPRadio {...props} />;
};

/**
 * EXPORTS
 */
export { IRadioProps, Radio };
