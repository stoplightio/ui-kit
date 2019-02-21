import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Box } from '../../Box';
import { Callout, ICallout } from '../../Callout';

export const calloutKnobs = (tabName = 'Callout'): ICallout => ({
  invalid: boolean('invalid', false, tabName),
  x: number('x', 0, { range: true, min: -1, max: 1, step: 0.1 }, tabName),
  skew: number('skew', 0, { range: true, min: -1, max: 1, step: 0.1 }, tabName),
  y: number('y', 0, { range: true, min: -5, max: 5, step: 1 }, tabName),
  tailWidth: number('tailWidth', 30, { range: true, min: 0, max: 1000, step: 10 }, tabName),
  tailHeight: number('tailHeight', 30, { range: true, min: 0, max: 100, step: 1 }, tabName),
});

storiesOf('Miscellaneous:Callout', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box width={number('container width', 400, {}, 'Callout')}>
      <Callout {...calloutKnobs()}>
        <p>{text('children', 'Here is some tooltip text', 'Callout')}</p>
      </Callout>
    </Box>
  ));
