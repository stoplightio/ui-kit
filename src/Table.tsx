/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

/**
 * TABLE
 */

export interface ITable extends IBox<HTMLTableElement> {
  isSelected?: boolean;
}

export const Table: FunctionComponent<ITable> = props => {
  const { children, isSelected, ...rest } = props;

  return jsx(
    Box,
    {
      ...rest,
      as: 'table',
      defaultCSS: tableStyles({ isSelected }),
    },
    jsx('tbody', null, children)
  );
};

export const tableStyles = ({ isSelected }: ITable) => {
  const { table } = useTheme();

  return [
    {
      border: '0 none',
      borderTop: '1px solid',
      borderCollapse: 'collapse',
      borderColor: table.border,
    },
    isSelected && {
      boxShadow: table.shadow,
    },
  ];
};

/**
 * TABLE ROW
 */

export interface ITableRow extends IBox<HTMLTableRowElement> {}

export const TableRow: FunctionComponent<ITableRow> = props => {
  return jsx(Box, {
    ...props,
    as: 'tr',
    defaultCSS: tableRowStyles(),
  });
};

export const tableRowStyles = () => {
  const { table } = useTheme();

  return [
    {
      border: '0 none',
      borderBottom: '1px solid',
      borderRight: '1px solid',
      borderColor: table.border,
    },
  ];
};

/**
 * TABLE CEL
 */

export interface ITableCell extends Omit<IBox<HTMLTableDataCellElement>, 'as'> {
  as?: 'th' | 'td';
}

export const TableCell: FunctionComponent<ITableCell> = props => {
  const { as = 'td', isSelected, ...rest } = props;

  return jsx(Box, {
    ...rest,
    as,
    defaultCSS: tableCellStyles({ as, isSelected }),
  });
};

export const tableCellStyles = ({ isSelected }: ITableCell) => {
  const { table } = useTheme();

  return [
    {
      border: '0 none',
      borderLeft: '1px solid',
      borderColor: table.border,
      textAlign: 'left',
    },
    isSelected && {
      boxShadow: table.shadow,
    },
  ];
};
