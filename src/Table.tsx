/* @jsx jsx */

import { jsx } from '@emotion/core';
import { Omit } from '@stoplight/types';
import { FunctionComponent } from 'react';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export const Table: FunctionComponent<ITable> = props => {
  const { children, isSelected, ...rest } = props;

  const css = tableStyles({ isSelected });

  return jsx(
    Box,
    {
      ...rest,
      as: 'table',
      css,
    },
    jsx('tbody', null, children)
  );
};

export interface ITable extends ITableProps, IBox<HTMLTableElement> {}

export interface ITableProps {
  isSelected?: boolean;
}

export const tableStyles = ({ isSelected }: ITableProps) => {
  const theme = useTheme();

  return [
    {
      border: '0 none',
      borderTop: '1px solid',
      borderCollapse: 'collapse',
      borderColor: theme.table.border,
    },
    isSelected && {
      boxShadow: theme.table.shadow,
    },
  ];
};

export const TableRow: FunctionComponent<ITableRow> = props => {
  const css = tableRowStyles();

  return jsx(Box, {
    ...props,
    as: 'tr',
    css,
  });
};

export interface ITableRow extends IBox<HTMLTableRowElement> {}

export const tableRowStyles = () => {
  const theme = useTheme();

  return [
    {
      border: '0 none',
      borderBottom: '1px solid',
      borderRight: '1px solid',
      borderColor: theme.table.border,
    },
  ];
};

export const TableCell: FunctionComponent<ITableCell> = props => {
  const { as = 'td', isSelected, ...rest } = props;
  const css = tableCellStyles({ as, isSelected });

  return jsx(Box, {
    ...rest,
    as,
    css,
  });
};

export interface ITableCell extends ITableCellProps, Omit<IBox<HTMLTableDataCellElement>, 'as'> {}

export interface ITableCellProps extends ITableProps {
  as?: 'th' | 'td';
}

export const tableCellStyles = ({ isSelected }: ITableCellProps) => {
  const theme = useTheme();

  return [
    {
      border: '0 none',
      borderLeft: '1px solid',
      borderColor: theme.table.border,
      textAlign: 'left',
    },
    isSelected && {
      boxShadow: theme.table.shadow,
    },
  ];
};
