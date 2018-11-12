// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

// @ts-ignore
import { number, select, text } from '@storybook/addon-knobs/react';

import { storiesOf } from '@storybook/react';
import * as React from 'react';

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

export const boxKnobs = (tabName = 'Box') => {
  return {
    fg: text('fg', undefined, tabName),
    bg: text('bg', undefined, tabName),
    text: select('text', FontSize, undefined, tabName),
    borderColor: text('borderColor', undefined, tabName),
    align: select('align', TextAlign, undefined, tabName),
    weight: select('weight', FontWeight, undefined, tabName),
    m: select('m', FullSpace, undefined, tabName),
    mt: select('mt', FullSpace, undefined, tabName),
    mr: select('mr', FullSpace, undefined, tabName),
    mb: select('mb', FullSpace, undefined, tabName),
    ml: select('ml', FullSpace, undefined, tabName),
    mx: select('mx', FullSpace, undefined, tabName),
    my: select('my', FullSpace, undefined, tabName),
    p: select('p', FullSpace, undefined, tabName),
    pt: select('pt', FullSpace, undefined, tabName),
    pr: select('pr', FullSpace, undefined, tabName),
    pb: select('pb', FullSpace, undefined, tabName),
    pl: select('pl', FullSpace, undefined, tabName),
    px: select('px', FullSpace, undefined, tabName),
    py: select('py', FullSpace, undefined, tabName),
    height: text('height', '', tabName),
    maxHeight: text('maxHeight', 'valid-maxHeight', tabName),
    minHeight: text('minHeight', 'valid-minHeight', tabName),
    width: text('width', '', tabName),
    maxWidth: text('maxWidth', 'valid-maxWidth', tabName),
    minWidth: text('minWidth', 'valid-minWidth', tabName),
    border: select('border', BorderWidth, undefined, tabName),
    borderTop: select('borderTop', BorderWidth, undefined, tabName),
    borderLeft: select('borderLeft', BorderWidth, undefined, tabName),
    borderRight: select('borderRight', BorderWidth, undefined, tabName),
    borderBottom: select('borderBottom', BorderWidth, undefined, tabName),
    radius: select('radius', BorderRadius, undefined, tabName),
    shadow: select('shadow', BoxShadow, undefined, tabName),
    opacity: number('opacity', 1, tabName),
    display: select('display', Display, undefined, tabName),
    overflow: select('overflow', OverFlow, undefined, tabName),
    overflowX: select('overflowX', OverFlow, undefined, tabName),
    overflowY: select('overflowY', OverFlow, undefined, tabName),
    postion: select('position', PositionOpts, undefined, tabName),
    top: number('top', undefined, tabName),
    bottom: number('bottom', undefined, tabName),
    left: number('left', undefined, tabName),
    right: number('right', undefined, tabName),
    z: number('z', undefined, tabName),
  };
};

storiesOf('components/Box', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Box {...boxKnobs()}>Box with child.</Box>);
