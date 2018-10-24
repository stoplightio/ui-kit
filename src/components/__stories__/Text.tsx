import * as React from 'react';

import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { Text } from '../Text';

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
  OverFlow,
  PositionOpts,
  TextAlign,
} from './_utils';

storiesOf('components/Text', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Text
      // specific to text
      tracking={select('tracking', LetterSpacing, undefined, 'Text')}
      leading={select('leading', LineHeight, undefined, 'Text')}
      casing={select('casing', Casing, undefined, 'Text')}
      decoration={select('decoration', Decoration, undefined, 'Text')} // TODO mutliselect?
      decorationColor={text('decorationColor', 'valid-color', 'Text')}
      italic={boolean('italic', false, 'Text')}
      // inherited from box
      fg={text('fg', 'valid-color')}
      bg={text('bg', 'valid-color')}
      text={select('text', FontSize)}
      align={select('align', TextAlign)}
      weight={select('weight', FontWeight)}
      m={select('m', FullSpace)}
      mt={select('mt', FullSpace)}
      mr={select('mr', FullSpace)}
      mb={select('mb', FullSpace)}
      ml={select('ml', FullSpace)}
      mx={select('mx', FullSpace)}
      my={select('my', FullSpace)}
      p={select('p', FullSpace)}
      pt={select('pt', FullSpace)}
      pr={select('pr', FullSpace)}
      pb={select('pb', FullSpace)}
      pl={select('pl', FullSpace)}
      px={select('px', FullSpace)}
      py={select('py', FullSpace)}
      height={text('height', 'valid-height')}
      maxHeight={text('maxHeight', 'valid-maxHeight')}
      minHeight={text('minHeight', 'valid-minHeight')}
      width={text('width', 'valid-width')}
      maxWidth={text('maxWidth', 'valid-maxWidth')}
      minWidth={text('minWidth', 'valid-minWidth')}
      border={select('border', BorderWidth)}
      borderTop={select('borderTop', BorderWidth)}
      borderLeft={select('borderLeft', BorderWidth)}
      borderRight={select('borderRight', BorderWidth)}
      borderBottom={select('borderBottom', BorderWidth)}
      borderColor={text('borderColor', 'valid-color')}
      radius={select('radius', BorderRadius)}
      shadow={select('shadow', BoxShadow)}
      opacity={number('opacity', 1)}
      display={select('display', Display)}
      overflow={select('overflow', OverFlow)}
      overflowX={select('overflowX', OverFlow)}
      overflowY={select('overflowY', OverFlow)}
      postion={select('position', PositionOpts)}
      top={number('top', undefined)}
      bottom={number('bottom', undefined)}
      left={number('left', undefined)}
      right={number('right', undefined)}
      z={number('z', undefined)}
    >
      Some Text in a P tag
    </Text>
  ));
