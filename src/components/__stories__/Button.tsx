import * as React from 'react';

import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { Button } from '../Button';

import { ThemeSection } from '../ThemeSection';
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

storiesOf('components/Button', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Button
      // specific to button: n/a
      disabled={boolean('disabled', false, 'Button')}
      // specific to text
      tracking={select('tracking', LetterSpacing, undefined, 'Text')}
      leading={select('leading', LineHeight, undefined, 'Text')}
      casing={select('casing', Casing, undefined, 'Text')}
      decoration={select('decoration', Decoration, undefined, 'Text')} // TODO mutliselect?
      decorationColor={text('decorationColor', 'valid-color', 'Text')}
      italic={boolean('italic', false, 'Text')}
      // inherited from box
      fg={text('fg', undefined, 'Box')}
      bg={text('bg', undefined, 'Box')}
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
      p={select('p', FullSpace, undefined, 'Box')}
      pt={select('pt', FullSpace, undefined, 'Box')}
      pr={select('pr', FullSpace, undefined, 'Box')}
      pb={select('pb', FullSpace, undefined, 'Box')}
      pl={select('pl', FullSpace, undefined, 'Box')}
      px={select('px', FullSpace, undefined, 'Box')}
      py={select('py', FullSpace, undefined, 'Box')}
      height={text('height', 'valid-height', 'Box')}
      maxHeight={text('maxHeight', 'valid-maxHeight', 'Box')}
      minHeight={text('minHeight', 'valid-minHeight', 'Box')}
      width={text('width', 'valid-width', 'Box')}
      maxWidth={text('maxWidth', 'valid-maxWidth', 'Box')}
      minWidth={text('minWidth', 'valid-minWidth', 'Box')}
      border={select('border', BorderWidth, 'xs', 'Box')}
      borderTop={select('borderTop', BorderWidth, undefined, 'Box')}
      borderLeft={select('borderLeft', BorderWidth, undefined, 'Box')}
      borderRight={select('borderRight', BorderWidth, undefined, 'Box')}
      borderBottom={select('borderBottom', BorderWidth, undefined, 'Box')}
      borderColor={text('borderColor', undefined, 'Box')}
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
      Button Text
    </Button>
  ));
