import { HTMLTable as BPTable, IHTMLTableProps as BPTableProps } from '@blueprintjs/core';
import * as React from 'react';

/**
 * TABLE
 */
interface ITableProps extends BPTableProps {}

const Table: React.FunctionComponent<ITableProps> = props => {
  return <BPTable {...props} />;
};

/**
 * EXPORTS
 */
export { ITableProps, Table };
