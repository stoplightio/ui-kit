/* @jsx jsx */

import { jsx } from '@emotion/core';

import { array, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Omit } from '@stoplight/types';
import { Box } from '../..';
import { IScrollList, RowRendererFunc, ScrollList } from '../../ScrollList';

export const scrollListKnobs = (tabName = 'List Scroller'): Omit<IScrollList, 'rowRenderer'> => ({
  scrollToIndex: number('scrollToIndex', 0, { min: 0, max: Infinity, step: 1, range: false }, tabName),
  rowHeight: number('rowHeight', 20, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
  list: array<string>('list', ['item 0', 'item 1', 'item 2', 'item 3', 'item 4', 'item5', 'item6'], 'item 0', tabName),
});

const rowRenderer: RowRendererFunc = ({ value, key, style }) => (
  <Box key={key} style={style} borderBottom="1px solid" borderColor="black">
    {value}
  </Box>
);

storiesOf('List & Tables:ScrollList', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <Box height="200px" css={{ outline: '2px solid black' }}>
      {storyFn()}
    </Box>
  ))
  .add('with defaults', () => <ScrollList {...scrollListKnobs()} rowRenderer={rowRenderer} />)
  .add('with random height', () => (
    <ScrollList {...scrollListKnobs()} rowHeight={({ index }) => 20 + index * 20} rowRenderer={rowRenderer} />
  ));
