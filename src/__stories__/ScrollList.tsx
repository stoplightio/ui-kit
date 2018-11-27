import * as React from 'react';

import { array, number, NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box } from '..';
import { IScrollListItemProps, ScrollList } from '../ScrollList';

export const scrollListKnobs = (tabName = 'List Scroller'): any => {
  return {
    scrollToIndex: number('scrollToIndex', 0, { min: 0, max: Infinity } as NumberOptions, tabName),
    rowHeight: number('rowHeight', 20, { min: 0, max: Infinity } as NumberOptions, tabName),
    list: array('list', ['item 0', 'item 1', 'item 2', 'item 3', 'item 4', 'item5', 'item6'], ',', tabName),
  };
};

const rowRenderer = ({ value, key, style }: IScrollListItemProps) => (
  <Box key={key} as="div" {...style as object} borderBottom="2px solid black">
    {value}
  </Box>
);

storiesOf('ScrollList', module)
  .addDecorator(withKnobs)
  // .addDecorator(storyFn => (
  //   <Box height="100px" css={{ outline: '2px solid black' }}>
  //     {storyFn()}
  //   </Box>
  // ))
  .addDecorator(storyFn => (
    <Box height="200px" css={{ outline: '2px solid black' }}>
      {storyFn()}
    </Box>
  ))
  .add('with defaults', () => <ScrollList {...scrollListKnobs()} rowRenderer={rowRenderer} />)
  .add('with random height', () => (
    <ScrollList {...scrollListKnobs()} rowHeight={({ index }) => 20 + index * 20} rowRenderer={rowRenderer} />
  ));
