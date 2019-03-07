import { Omit } from '@stoplight/types';
import * as React from 'react';

import { Box, IBox, IBoxCSS } from './Box';
import { ITheme, useTheme } from './theme';

/**
 * TABLE
 */

export interface ITable extends IBox<HTMLTableElement> {
  isSelected?: boolean;
}

const Table: React.FunctionComponent<ITable> = React.forwardRef<HTMLTableElement, ITable>(function Table(props, ref) {
  const { children, isSelected, css, ...rest } = props;

  const { table: theme } = useTheme();

  return (
    <Box {...rest} as="table" ref={ref} css={[tableStyles(theme, { isSelected }), css]}>
      <tbody>{children}</tbody>
    </Box>
  );
});

Table.displayName = 'Table';

export const tableStyles = (theme: ITheme['table'], { isSelected }: ITable): IBoxCSS => {
  return [
    {
      border: '1px solid',
      borderCollapse: 'collapse',
      borderColor: theme.border,
      tr: {
        '&:first-of-type': {
          fontWeight: 'bold',
        },
      },
    },
    isSelected && {
      boxShadow: theme.shadow,
    },
  ];
};

/**
 * TABLE ROW
 */

export interface ITableRow extends IBox<HTMLTableRowElement> {}

const TableRow: React.FunctionComponent<ITableRow> = React.forwardRef<HTMLTableRowElement, ITableRow>(function TableRow(
  props,
  ref
) {
  const { table: theme } = useTheme();
  return <Box {...props} as="tr" ref={ref} css={tableRowStyles(theme)} />;
});

export const tableRowStyles = (theme: ITheme['table']) => {
  return [
    {
      border: '0 none',
      borderBottom: '1px solid',
      borderColor: theme.border,
      '&:last-child': {
        borderBottom: '0 none',
      },
      '&:nth-of-type(even)': {
        backgroundColor: theme.evenBg,
      },
    },
  ];
};

TableRow.displayName = 'TableRow';

/**
 * TABLE CELL
 */

export interface ITableCell extends Omit<IBox<HTMLTableDataCellElement>, 'as'> {
  as?: 'th' | 'td';
}

const TableCell: React.FunctionComponent<ITableCell> = React.forwardRef<HTMLTableDataCellElement, ITableCell>(
  function TableCell(props, ref) {
    const { as = 'td', isSelected, textAlign, ...rest } = props;
    const { table: theme } = useTheme();
    return <Box {...rest} as={as} ref={ref} css={tableCellStyles(theme, { as, isSelected, textAlign })} />;
  }
);

TableCell.displayName = 'TableCell';

const textAlignPadding = {
  left: '10px 40px 10px 15px',
  center: '10px 15px 10px 15px',
  right: '10px 15px 10px 40px',
};

export const tableCellStyles = (theme: ITheme['table'], { isSelected, textAlign = 'left' }: ITableCell): IBoxCSS => {
  return [
    {
      border: '0 none',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderColor: theme.border,
      textAlign,
      padding: textAlignPadding[textAlign],
      '&:first-of-type': {
        borderLeft: '0 none',
      },
      '&:last-child': {
        borderRight: '0 none',
      },
    },
    isSelected && {
      boxShadow: theme.shadow,
    },
  ];
};

export { Table, TableRow, TableCell };
