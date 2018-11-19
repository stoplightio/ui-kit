import * as React from 'react';

import { array, number, NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box } from '../src';
import { IListScrollerItemProps, ListScroller } from '../src/ListScroller';

export const listScrollerKnobs = (tabName = 'List Scroller'): any => {
  return {
    scrollToIndex: number('scrollToIndex', 0, { min: 0, max: Infinity } as NumberOptions, tabName),
    rowHeight: number('rowHeight', 20, { min: 0, max: Infinity } as NumberOptions, tabName),
    listHeight: number('listHeight', 50, { min: 0, max: Infinity } as NumberOptions, tabName),
    listWidth: number('listWidth', 90, { min: 0, max: Infinity } as NumberOptions, tabName),
    list: array('list', ['item 0', 'item 1', 'item 2', 'item 3', 'item 4'], ',', tabName),
  };
};

storiesOf('ListScroller', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <ListScroller
      {...listScrollerKnobs()}
      renderRow={({ value, key }: IListScrollerItemProps) => (
        <Box key={key} as="div">
          {value}
        </Box>
      )}
    />
  ));
