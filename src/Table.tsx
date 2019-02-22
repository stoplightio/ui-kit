import { Omit } from '@stoplight/types';
import * as React from 'react';

import { Box, IBox, IBoxCSS } from './Box';
import { useTheme } from './theme';

/**
 * TABLE
 */

export interface ITable extends IBox<HTMLTableElement> {
  isSelected?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, ITable>((props, ref) => {
  const { children, isSelected, css, ...rest } = props;

  return (
    <Box {...rest} as="table" ref={ref} css={[tableStyles({ isSelected }), css]}>
      <tbody>{children}</tbody>
    </Box>
  );
});

export const tableStyles = ({ isSelected }: ITable): IBoxCSS => {
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

export const TableRow = React.forwardRef<HTMLTableRowElement, ITableRow>((props, ref) => {
  return <Box {...props} as="tr" ref={ref} css={tableRowStyles()} />;
});

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

export const TableCell = React.forwardRef<HTMLTableDataCellElement, ITableCell>((props, ref) => {
  const { as = 'td', isSelected, ...rest } = props;
  return <Box {...rest} as={as} ref={ref} css={tableCellStyles({ as, isSelected })} />;
});

export const tableCellStyles = ({ isSelected }: ITableCell): IBoxCSS => {
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
