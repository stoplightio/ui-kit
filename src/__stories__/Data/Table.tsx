/* @jsx jsx */

import { jsx } from '@emotion/core';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Table, TableCell, TableRow } from '../../Table';

storiesOf('List & Tables:Table', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Table>
      <TableRow>
        <TableCell as="th">Site</TableCell>
        <TableCell as="th">Views</TableCell>
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
        <TableCell minWidth="300px" as="th">
          Site
        </TableCell>
        <TableCell as="th">Views</TableCell>
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
        <TableCell as="th">Site</TableCell>
        <TableCell as="th">Views</TableCell>
      </TableRow>
      <TableRow>
        <TableCell isSelected>stoplight.io</TableCell>
        <TableCell>27341</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>example.com</TableCell>
        <TableCell>2351</TableCell>
      </TableRow>
    </Table>
  ));
