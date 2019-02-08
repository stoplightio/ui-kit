import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { TextAlignProps } from 'styled-system';

import { Box, IBox } from '../../Box';
import { Display, OverFlow, PositionOpts, TextAlign } from '../_utils';

export const boxKnobs = <T extends HTMLElement = HTMLDivElement>(tabName = 'Box'): Partial<IBox<T>> => ({
  color: text('color', null, tabName),
  backgroundColor: text('backgroundColor', null, tabName),
  textAlign: select('textAlign', TextAlign, 'initial', tabName) as TextAlignProps['textAlign'],
  fontSize: text('fontSize', null, tabName),
  fontWeight: select('fontWeight', [100, 200, 300, 400, 500, 600, 700, 800, 900], 400, tabName),
  m: text('m', null, tabName),
  mt: text('mt', null, tabName),
  mr: text('mr', null, tabName),
  mb: text('mb', null, tabName),
  ml: text('ml', null, tabName),
  mx: text('mx', null, tabName),
  my: text('my', null, tabName),
  p: text('p', null, tabName),
  pt: text('pt', null, tabName),
  pr: text('pr', null, tabName),
  pb: text('pb', null, tabName),
  pl: text('pl', null, tabName),
  px: text('px', null, tabName),
  py: text('py', null, tabName),
  height: text('height', null, tabName),
  maxHeight: text('maxHeight', null, tabName),
  minHeight: text('minHeight', null, tabName),
  width: text('width', null, tabName),
  maxWidth: text('maxWidth', null, tabName),
  minWidth: text('minWidth', null, tabName),
  border: text('border', null, tabName),
  borderColor: text('borderColor', null, tabName),
  borderTop: text('borderTop', null, tabName),
  borderLeft: text('borderLeft', null, tabName),
  borderRight: text('borderRight', null, tabName),
  borderBottom: text('borderBottom', null, tabName),
  borderRadius: text('borderRadius', null, tabName),
  boxShadow: text('boxShadow', null, tabName),
  opacity: number(
    'opacity',
    1,
    {
      min: 0,
      max: 1,
      step: 0.01,
      range: false,
    },
    tabName
  ),
  display: select('display', Display, '', tabName),
  overflow: select('overflow', OverFlow, '', tabName),
  overflowX: select('overflowX', OverFlow, '', tabName) as IBox['overflowX'],
  overflowY: select('overflowX', OverFlow, '', tabName) as IBox['overflowY'],
  position: select('position', PositionOpts, '', tabName) as IBox['position'],
  top: number('top', 0, {}, tabName),
  bottom: number('bottom', 0, {}, tabName),
  left: number('left', 0, {}, tabName),
  right: number('right', 0, {}, tabName),
  z: number('z', 0, {}, tabName),
});

storiesOf('Layout:Box', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Box {...boxKnobs()}>Box with child.</Box>);
