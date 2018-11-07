import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { List } from '../List';
import {
  BorderRadius,
  BorderWidth,
  BoxShadow,
  Casing,
  Decoration,
  Display,
  FontSize,
  FontWeight,
  FullSpace,
  LetterSpacing,
  LineHeight,
  ListStylePosition,
  ListStyleType,
  OverFlow,
  PositionOpts,
  TextAlign,
} from './_utils';

export const listKnobs = (tabName = 'List') => {
  return {
    itemType: select('itemType', ListStyleType, undefined, tabName),
    listPosition: select('listPosition', ListStylePosition, undefined, tabName),
  };
};

storiesOf('components/List', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <List
      {...listKnobs()}
      // specific to text
      tracking={select('tracking', LetterSpacing, undefined, 'Text')}
      leading={select('leading', LineHeight, undefined, 'Text')}
      casing={select('casing', Casing, undefined, 'Text')}
      decoration={select('decoration', Decoration, undefined, 'Text')} // TODO mutliselect?
      decorationColor={text('decorationColor', 'valid-color', 'Text')}
      italic={boolean('italic', false, 'Text')}
      // inherited from box
      fg={text('fg', 'valid-color', 'Box')}
      bg={text('bg', 'valid-color', 'Box')}
      text={select('text', FontSize, undefined, 'Box')}
      align={select('align', TextAlign, undefined, 'Box')}
      weight={select('weight', FontWeight, undefined, 'Box')}
      m={select('m', FullSpace, undefined, 'Box')}
      mt={select('mt', FullSpace, undefined, 'Box')}
      mr={select('mr', FullSpace, undefined, 'Box')}
      mb={select('mb', FullSpace, undefined, 'Box')}
      ml={select('ml', FullSpace, undefined, 'Box')}
      mx={select('mx', FullSpace, undefined, 'Box')}
      my={select('my', FullSpace, undefined, 'Box')}
      p={select('p', FullSpace, 'md', 'Box')}
      pt={select('pt', FullSpace, undefined, 'Box')}
      pr={select('pr', FullSpace, undefined, 'Box')}
      pb={select('pb', FullSpace, undefined, 'Box')}
      pl={select('pl', FullSpace, undefined, 'Box')}
      px={select('px', FullSpace, undefined, 'Box')}
      py={select('py', FullSpace, undefined, 'Box')}
      height={text('height', '30%', 'Box')}
      maxHeight={text('maxHeight', 'valid-maxHeight', 'Box')}
      minHeight={text('minHeight', 'valid-minHeight', 'Box')}
      width={text('width', '30%', 'Box')}
      maxWidth={text('maxWidth', 'valid-maxWidth', 'Box')}
      minWidth={text('minWidth', 'valid-minWidth', 'Box')}
      border={select('border', BorderWidth, 'xs', 'Box')}
      borderTop={select('borderTop', BorderWidth, undefined, 'Box')}
      borderLeft={select('borderLeft', BorderWidth, undefined, 'Box')}
      borderRight={select('borderRight', BorderWidth, undefined, 'Box')}
      borderBottom={select('borderBottom', BorderWidth, undefined, 'Box')}
      borderColor={text('borderColor', 'valid-color', 'Box')}
      radius={select('radius', BorderRadius, undefined, 'Box')}
      shadow={select('shadow', BoxShadow, undefined, 'Box')}
      opacity={number('opacity', 1, 'Box')}
      display={select('display', Display, undefined, 'Box')}
      overflow={select('overflow', OverFlow, undefined, 'Box')}
      overflowX={select('overflowX', OverFlow, undefined, 'Box')}
      overflowY={select('overflowY', OverFlow, undefined, 'Box')}
      postion={select('position', PositionOpts, undefined, 'Box')}
      top={number('top', undefined, 'Box')}
      bottom={number('bottom', undefined, 'Box')}
      left={number('left', undefined, 'Box')}
      right={number('right', undefined, 'Box')}
      z={number('z', undefined, 'Box')}
    >
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </List>
  ));