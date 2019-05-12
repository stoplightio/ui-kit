import * as React from 'react';

import { Omit } from '@stoplight/types';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { areEqual } from 'react-window';
import { FixedSizeList, IFixedSizeListProps, IVariableSizeListProps, VariableSizeList } from '../../ScrollList';

/**
 * KNOBS
 */

export const variableSizeListKnobs = (tabName = 'VariableSizeList'): Omit<IVariableSizeListProps, 'children'> => ({
  itemSize: () => 0,
  // @ts-ignore doesn't list typings
  direction: select('direction', ['vertical', 'horizontal'], 'vertical', tabName),
  itemCount: number('itemCount', 20, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
});

export const fixedSizeListKnobs = (tabName = 'FixedSizeList'): Omit<IFixedSizeListProps, 'children'> => ({
  ...variableSizeListKnobs(tabName),
  maxRows: number('maxRows', 5, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
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

const Decorator: any = (storyFn: any) => (
  <div style={{ outline: '1px solid currentColor', margin: 50 }}>{storyFn()}</div>
);

/**
 * STORIES
 */
storiesOf('ScrollList-FixedSizeList', module)
  .addDecorator(withKnobs)
  .addDecorator(Decorator)
  .add('with defaults', () => <FixedSizeList {...fixedSizeListKnobs()}>{Row}</FixedSizeList>)
  .add('memoized', () => <FixedSizeList {...fixedSizeListKnobs()}>{MemoizedRow}</FixedSizeList>);

storiesOf('ScrollList-VariableSizeList', module)
  .addDecorator(withKnobs)
  .addDecorator(Decorator)
  .add('with defaults', () => (
    <VariableSizeList {...variableSizeListKnobs()} itemSize={index => Math.max(20, index * 10)}>
      {Row}
    </VariableSizeList>
  ))
  .add('memoized', () => (
    <VariableSizeList {...variableSizeListKnobs()} itemSize={index => Math.max(20, index * 10)}>
      {MemoizedRow}
    </VariableSizeList>
  ));
