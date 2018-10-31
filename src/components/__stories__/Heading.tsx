import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Heading } from '../Heading';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const headingKnobs = (tabName = 'Heading') => {
  return {
    as: select('as', [undefined, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], undefined, tabName),
  };
};

storiesOf('components/Heading', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Heading {...headingKnobs()} {...textKnobs()} {...boxKnobs()}>
      Some Text in a H* tag
    </Heading>
  ));
