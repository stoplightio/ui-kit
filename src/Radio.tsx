import { IRadioProps as BPRadioProps, Radio as BPRadio } from '@blueprintjs/core';
import * as React from 'react';

interface IRadio extends BPRadioProps {}
const Radio: React.FunctionComponent<IRadio> = props => {
  return <BPRadio {...props} />;
};

export { IRadio, Radio };
