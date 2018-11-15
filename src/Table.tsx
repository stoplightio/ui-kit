import * as React from 'react';
import { themeGet } from 'styled-system';
import { minWidth, styled } from './utils';

interface ITableProps {
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
  `box-shadow: ${props.isSelection ? getBoxShadowTheme(props) : ''}`;

export const Table = styled<ITableProps, 'table'>(TableView as any)`
  border: none;
  border-collapse: collapse;
  border-top: 1px solid ${themeGet('colors.border', '#000')};
  ${boxShadow};
`;

export const TableRow = styled<ITableProps, 'tr'>('tr')`
  border: none;
  border-bottom: 1px solid ${themeGet('colors.border', '#000')};
  border-right: 1px solid ${themeGet('colors.border', '#000')};
`;

export const TableHeadCell = styled<ITableCellProps, 'th'>('th')`
  border: none;
  border-left: 1px solid ${themeGet('colors.border', '#000')};
  ${boxShadow};
  ${minWidth};
`;

export const TableCell = styled<ITableCellProps, 'td'>('td')`
  border: none;
  border-left: 1px solid ${themeGet('colors.border', '#000')};
  ${boxShadow};
  ${minWidth};
`;
