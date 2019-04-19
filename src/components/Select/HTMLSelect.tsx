import { HTMLSelect as BPSelect, IHTMLSelectProps as BPSelectProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * Select
 */
interface IHTMLSelectProps extends BPSelectProps {}

const HTMLSelect: React.FunctionComponent<IHTMLSelectProps> = props => {
  return <BPSelect {...props} />;
};

/**
 * EXPORTS
 */
export { IHTMLSelectProps, HTMLSelect };
