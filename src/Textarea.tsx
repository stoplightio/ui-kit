import { ITextProps as BPTextareaProps, Text as BPTextarea } from '@blueprintjs/core';
import * as React from 'react';

/**
 * TEXTAREA
 */
interface ITextareaProps extends BPTextareaProps {}
const Textarea: React.FunctionComponent<ITextareaProps> = props => {
  return <BPTextarea {...props} />;
};

/**
 * EXPORTS
 */
export { ITextareaProps, Textarea };
