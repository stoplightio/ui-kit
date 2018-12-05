import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Heading, IHeadingProps } from '../emotion/Heading';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const headingKnobs = (tabName = 'Heading'): IHeadingProps => ({
  as: select<any>('as', [undefined, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], 'h1', tabName),
});

storiesOf('Heading', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Heading {...headingKnobs()} {...textKnobs()} {...boxKnobs()}>
      Some Text in a H* tag
    </Heading>
  ));
