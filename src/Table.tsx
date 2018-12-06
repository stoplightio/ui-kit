/* @jsx jsx */

import { jsx } from '@emotion/core';
import { createElement, FunctionComponent, HTMLAttributes } from 'react';
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
    [createElement('tbody', null, children)]
  );
};

export interface ITable extends ITableProps, IBox, HTMLAttributes<HTMLTextAreaElement> {}

export interface ITableProps {
  isSelected?: boolean;
}

export const tableStyles = ({ isSelected }: ITableProps) => {
  const theme = useTheme();

  return [
    {
      border: '0',
      // todo: use some shared value
      borderTop: '1px solid',
      borderCollapse: 'collapse',
      borderColor: theme.table.borderColor,
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

export interface ITableRow extends IBox, HTMLAttributes<HTMLTableRowElement> {}

export const tableRowStyles = () => {
  const theme = useTheme();

  return [
    {
      border: '0',
      // todo: use some shared value
      borderBottom: '1px solid',
      borderRight: '1px solid',
      borderColor: theme.table.borderColor,
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

export interface ITableCell
  extends ITableCellProps,
    Pick<IBox, Exclude<keyof IBox, 'as'>>,
    HTMLAttributes<HTMLTableRowElement> {}

export interface ITableCellProps extends ITableProps {
  as?: 'th' | 'td';
}

export const tableCellStyles = ({ isSelected }: ITableCellProps) => {
  const theme = useTheme();

  return [
    {
      border: '0',
      // todo: use some shared value
      borderLeft: '1px solid',
      borderColor: theme.table.borderColor,
      textAlign: 'left',
    },
    isSelected && {
      boxShadow: theme.table.shadow,
    },
  ];
};
