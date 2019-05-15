import * as React from 'react';

import { Omit } from '@stoplight/types';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { areEqual } from 'react-window';
import { FixedSizeList, IFixedSizeListProps } from '../../ScrollList';

/**
 * KNOBS
 */

export const fixedSizeListKnobs = (tabName = 'FixedSizeList'): Omit<IFixedSizeListProps, 'children'> => ({
  itemCount: number('itemCount', 20, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
  itemSize: number('itemSize', 50, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
});

/**
 * COMPONENTS
 */

const Row: React.FunctionComponent<any> = ({ index, style }) => (
  <div style={style} className="flex items-center border-b px-4">
    <div className="flex-1">{index}.</div>
    <div>Item</div>
  </div>
);

const MemoizedRow = React.memo(props => <Row {...props} />, areEqual);

/**
 * STORIES
 */
storiesOf('ScrollList-FixedSizeList', module)
  .addDecorator(withKnobs)
  .add('grow to container height', () => (
    <div style={{ outline: '1px solid currentColor', height: '50vh', margin: 50 }}>
      <FixedSizeList {...fixedSizeListKnobs()}>{Row}</FixedSizeList>
    </div>
  ))

  .add('maxRows', () => (
    <div style={{ outline: '1px solid currentColor', margin: 50 }}>
      <FixedSizeList
        {...fixedSizeListKnobs()}
        maxRows={number('maxRows', 5, { min: 0, max: Infinity, range: false, step: 1 }, 'FixedSizeList')}
      >
        {Row}
      </FixedSizeList>
    </div>
  ))
  .add('memoized', () => (
    <div style={{ outline: '1px solid currentColor', height: '50vh', margin: 50 }}>
      <FixedSizeList {...fixedSizeListKnobs()}>{MemoizedRow}</FixedSizeList>
    </div>
  ));
