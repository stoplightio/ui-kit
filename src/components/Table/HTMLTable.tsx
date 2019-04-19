import { HTMLTable as BPTable, IHTMLTableProps as BPTableProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * HTML TABLE
 */
interface IHTMLTableProps extends BPTableProps {}

const HTMLTable: React.FunctionComponent<IHTMLTableProps> = props => {
  return <BPTable {...props} />;
};

/**
 * EXPORTS
 */
export { IHTMLTableProps, HTMLTable };
