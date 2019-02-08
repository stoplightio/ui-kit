import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { number } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Break, IBreak } from '../../Break';
import { boxKnobs } from './Box';

export const breakKnobs = (tabName = 'Break'): IBreak => ({
  thickness: number('thickness', 10, { min: 0, max: Infinity, step: 1, range: false }, tabName),
});

storiesOf('Layout:Break', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Break {...boxKnobs()} {...breakKnobs()} />);
