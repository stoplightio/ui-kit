import * as React from 'react';

import { Omit } from '@stoplight/types';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { areEqual, Box, Flex } from '../..';
import { FixedSizeList, IFixedSizeList, IVariableSizeList, VariableSizeList } from '../../ScrollList';

export const variableSizeListKnobs = (tabName = 'VariableSizeList'): Omit<IVariableSizeList, 'children'> => ({
  itemSize: () => 0,
  direction: select('direction', ['vertical', 'horizontal'], 'vertical', tabName),
  height: text('height', '500px', tabName),
  width: text('width', '100%', tabName),
  itemCount: number('itemCount', 20, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
});

export const fixedSizeListKnobs = (tabName = 'FixedSizeList'): Omit<IFixedSizeList, 'children'> => ({
  ...variableSizeListKnobs(tabName),
  itemSize: number('itemSize', 50, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
});

const Row: React.FunctionComponent<any> = ({ index, style, key }) => (
  <Flex key={key} style={style} alignItems="center" borderBottom="1px solid" borderColor="currentColor">
    Item {index}
  </Flex>
);

const MemoizedRow = React.memo(props => <Row {...props} />, areEqual);

storiesOf('List & Tables:FixedSizeList', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <Box css={{ outline: '2px solid currentColor' }}>{storyFn()}</Box>)
  .add('with defaults', () => <FixedSizeList {...fixedSizeListKnobs()}>{Row}</FixedSizeList>)
  .add('memoized', () => <FixedSizeList {...fixedSizeListKnobs()}>{MemoizedRow}</FixedSizeList>);

storiesOf('List & Tables:VariableSizeList', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <Box css={{ outline: '2px solid currentColor' }}>{storyFn()}</Box>)
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
