import * as React from 'react';

import { number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { Box } from '../Box';

import {
  BorderRadius,
  BorderWidth,
  BoxShadow,
  Display,
  FontSize,
  FontWeight,
  FullSpace,
  OverFlow,
  PositionOpts,
  TextAlign,
} from './_utils';

storiesOf('components/Box', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box
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
      Box with child.
    </Box>
  ));
