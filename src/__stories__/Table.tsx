import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Table, TableCell, TableHeadCell, TableRow } from '../Table';

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Table>
      <TableRow>
        <TableHeadCell>Site</TableHeadCell>
        <TableHeadCell>Views</TableHeadCell>
      </TableRow>
      <TableRow>
        <TableCell>stoplight.io</TableCell>
        <TableCell>27341</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>example.com</TableCell>
        <TableCell>2351</TableCell>
      </TableRow>
    </Table>
  ))
  .add('with minWidth', () => (
    <Table>
      <TableRow>
        <TableHeadCell minWidth="300px">Site</TableHeadCell>
        <TableHeadCell>Views</TableHeadCell>
      </TableRow>
      <TableRow>
        <TableCell>stoplight.io</TableCell>
        <TableCell>27341</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>example.com</TableCell>
        <TableCell>2351</TableCell>
      </TableRow>
    </Table>
  ))
  .add('with selection', () => (
    <Table>
      <TableRow>
        <TableHeadCell>Site</TableHeadCell>
        <TableHeadCell>Views</TableHeadCell>
      </TableRow>
      <TableRow>
        <TableCell isSelection>stoplight.io</TableCell>
        <TableCell>27341</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>example.com</TableCell>
        <TableCell>2351</TableCell>
      </TableRow>
    </Table>
  ));
