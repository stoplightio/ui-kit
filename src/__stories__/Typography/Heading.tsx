import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Heading, IHeading } from '../../Heading';
import { textKnobs } from './Text';

export const headingKnobs = (tabName = 'Heading'): IHeading => ({
  ...textKnobs(),
  as: select('as', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], 'h1', tabName),
});

storiesOf('Typography:Heading', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Heading {...headingKnobs()}>Some Text in a H* tag</Heading>);
