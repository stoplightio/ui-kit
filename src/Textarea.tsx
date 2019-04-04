import { ITextProps as BPTextareaProps, Text as BPTextarea } from '@blueprintjs/core';
import * as React from 'react';

interface ITextarea extends BPTextareaProps {}
const Textarea: React.FunctionComponent<ITextarea> = props => {
  return <BPTextarea {...props} />;
};

export { ITextarea, Textarea };
