/* @jsx jsx */

import { jsx } from '@emotion/core';
import { withKnobs } from '@storybook/addon-knobs';
import { number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as ss from 'styled-system';

import { Box, IBox } from '../../Box';
import { Display, OverFlow, PositionOpts, TextAlign } from '../_utils';

const spacingOpts = {
  min: 0,
  max: Infinity,
  step: 1,
  range: false,
};

export const boxKnobs = <T extends HTMLElement = HTMLDivElement>(tabName = 'Box'): Partial<IBox<T>> => ({
  color: text('color', null, tabName),
  backgroundColor: text('backgroundColor', null, tabName),
  textAlign: select('textAlign', TextAlign, 'initial', tabName) as ss.TextAlignProps['textAlign'],
  fontSize: text('fontSize', '', tabName),
  fontWeight: select('fontWeight', [100, 200, 300, 400, 500, 600, 700, 800, 900], 400, tabName),
  m: number('m', 0, spacingOpts, tabName),
  mt: number('mt', 0, spacingOpts, tabName),
  mr: number('mr', 0, spacingOpts, tabName),
  mb: number('mb', 0, spacingOpts, tabName),
  ml: number('ml', 0, spacingOpts, tabName),
  mx: number('mx', 0, spacingOpts, tabName),
  my: number('my', 0, spacingOpts, tabName),
  p: number('p', 0, spacingOpts, tabName),
  pt: number('pt', 0, spacingOpts, tabName),
  pr: number('pr', 0, spacingOpts, tabName),
  pb: number('pb', 0, spacingOpts, tabName),
  pl: number('pl', 0, spacingOpts, tabName),
  px: number('px', 0, spacingOpts, tabName),
  py: number('py', 0, spacingOpts, tabName),
  height: text('height', '', tabName),
  maxHeight: text('maxHeight', '', tabName),
  minHeight: text('minHeight', '', tabName),
  width: text('width', '', tabName),
  maxWidth: text('maxWidth', '', tabName),
  minWidth: text('minWidth', '', tabName),
  border: text('border', 'none', tabName),
  borderColor: text('borderColor', null, tabName),
  borderTop: text('borderTop', '0px', tabName),
  borderLeft: text('borderLeft', '0px', tabName),
  borderRight: text('borderRight', '0px', tabName),
  borderBottom: text('borderBottom', '0px', tabName),
  borderRadius: text('borderRadius', '0', tabName),
  boxShadow: text('boxShadow', 'none', tabName),
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
  overflowX: select('overflowX', OverFlow, '', tabName),
  overflowY: select('overflowY', OverFlow, '', tabName),
  position: select('position', PositionOpts, '', tabName) as ss.PositionProps['position'],
  top: number('top', 0, {}, tabName),
  bottom: number('bottom', 0, {}, tabName),
  left: number('left', 0, {}, tabName),
  right: number('right', 0, {}, tabName),
  z: number('z', 0, {}, tabName),
});

storiesOf('Layout/Box', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Box {...boxKnobs()}>Box with child.</Box>);
