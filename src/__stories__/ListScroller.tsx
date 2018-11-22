import * as React from 'react';

import { array, number, NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box } from '..';
import { IListScrollerItemProps, ListScroller } from '../ListScroller';

export const listScrollerKnobs = (tabName = 'List Scroller'): any => {
  return {
    scrollToIndex: number('scrollToIndex', 0, { min: 0, max: Infinity } as NumberOptions, tabName),
    rowHeight: number('rowHeight', 20, { min: 0, max: Infinity } as NumberOptions, tabName),
    list: array('list', ['item 0', 'item 1', 'item 2', 'item 3', 'item 4'], ',', tabName),
  };
};

storiesOf('ListScroller', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <Box height="100px">{storyFn()}</Box>)
  .add('with defaults', () => (
    <ListScroller
      {...listScrollerKnobs()}
      rowRenderer={({ value, key, style }: IListScrollerItemProps) => (
        <Box key={key} as="div" {...style as object}>
          {value}
        </Box>
      )}
    />
  ))
  .add('with random height', () => (
    <ListScroller
      {...listScrollerKnobs()}
      rowHeight={({ index }) => 20 + index * 20}
      rowRenderer={({ value, key, style }: IListScrollerItemProps) => (
        <Box key={key} as="div" {...style as object}>
          {value}
        </Box>
      )}
    />
  ));
