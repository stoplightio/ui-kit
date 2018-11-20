import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

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

export const boxKnobs = (tabName = 'Box'): any => {
  return omitBy(
    {
      fg: text('fg', null, tabName),
      bg: text('bg', null, tabName),
      text: select('text', FontSize, '', tabName),
      borderColor: text('borderColor', null, tabName),
      align: select('align', TextAlign, '', tabName),
      weight: select('weight', FontWeight, '', tabName),
      m: select('m', FullSpace, '', tabName),
      mt: select('mt', FullSpace, '', tabName),
      mr: select('mr', FullSpace, '', tabName),
      mb: select('mb', FullSpace, '', tabName),
      ml: select('ml', FullSpace, '', tabName),
      mx: select('mx', FullSpace, '', tabName),
      my: select('my', FullSpace, '', tabName),
      p: select('p', FullSpace, '', tabName),
      pt: select('pt', FullSpace, '', tabName),
      pr: select('pr', FullSpace, '', tabName),
      pb: select('pb', FullSpace, '', tabName),
      pl: select('pl', FullSpace, '', tabName),
      px: select('px', FullSpace, '', tabName),
      py: select('py', FullSpace, '', tabName),
      height: text('height', '', tabName),
      maxHeight: text('maxHeight', '', tabName),
      minHeight: text('minHeight', '', tabName),
      width: text('width', '', tabName),
      maxWidth: text('maxWidth', '', tabName),
      minWidth: text('minWidth', '', tabName),
      border: select('border', BorderWidth, '', tabName),
      borderTop: select('borderTop', BorderWidth, '', tabName),
      borderLeft: select('borderLeft', BorderWidth, '', tabName),
      borderRight: select('borderRight', BorderWidth, '', tabName),
      borderBottom: select('borderBottom', BorderWidth, '', tabName),
      radius: select('radius', BorderRadius, '', tabName),
      shadow: select('shadow', BoxShadow, '', tabName),
      opacity: number('opacity', 1, {}, tabName),
      display: select('display', Display, '', tabName),
      overflow: select('overflow', OverFlow, '', tabName),
      overflowX: select('overflowX', OverFlow, '', tabName),
      overflowY: select('overflowY', OverFlow, '', tabName),
      position: select('position', PositionOpts, '', tabName),
      top: number('top', 0, {}, tabName),
      bottom: number('bottom', 0, {}, tabName),
      left: number('left', 0, {}, tabName),
      right: number('right', 0, {}, tabName),
      z: number('z', 0, {}, tabName),
    },
    val => !val
  );
};

storiesOf('Box', module)
  .addDecorator(withKnobs)
  // @ts-ignore FIXME
  .add('with defaults', () => <Box {...boxKnobs()}>Box with child.</Box>);
