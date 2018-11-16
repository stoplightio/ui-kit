import * as React from 'react';
import { themeGet } from 'styled-system';
import { Box, IBoxProps } from './Box';
import { styled } from './utils';

interface ITableProps extends IBoxProps {
  children: any;
  isSelection?: boolean;
}

interface ITableCellProps extends ITableProps {
  minWidth?: string;
}

interface ITableViewProps {
  className: string;
  children: any;
}

const TableView = ({ className, children }: ITableViewProps) => (
  <table className={className}>
    <tbody>{children}</tbody>
  </table>
);

const getBoxShadowTheme = themeGet('shadows.lg', '0 0 5px #000');
const boxShadow = (props: ITableCellProps | ITableProps) =>
  props.isSelection && {
    boxShadow: getBoxShadowTheme(props),
  };

export const Table = styled<ITableProps, 'table'>(Box as any).attrs({
  as: () => TableView,
  border: 'none',
  borderTop: 'sm',
  borderColor: 'colors.border',
  css: {
    'border-collapse': 'collapse',
  },
})(
  // @ts-ignore
  boxShadow
);

export const TableRow = styled<ITableProps, 'tr'>(Box as any).attrs({
  as: 'tr',
  border: 'none',
  borderBottom: 'sm',
  borderRight: 'sm',
  borderColor: 'colors.border',
})``;

export const TableHeadCell = styled<ITableCellProps, 'th'>(Box as any).attrs({
  as: 'td',
  border: 'none',
  borderLeft: 'sm',
  borderColor: 'colors.border',
})(
  // @ts-ignore
  boxShadow
);

export const TableCell = styled<ITableCellProps, 'td'>(Box as any).attrs({
  as: 'td',
  border: 'none',
  borderLeft: 'sm',
  borderColor: 'colors.border',
})(
  // @ts-ignore
  boxShadow
);
