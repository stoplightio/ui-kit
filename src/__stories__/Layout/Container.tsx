/* @jsx jsx */

import { jsx } from '@emotion/core';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box, Container, IContainer } from '../../';
import { boxKnobs } from './Box';

export const containerKnobs = (tabName = 'Container'): IContainer => ({
  ...boxKnobs(),
});

storiesOf('Layout/Container', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Container {...containerKnobs()}>
      {['item', 'item 2', 'item 3'].map(item => (
        <Box>{item}</Box>
      ))}
    </Container>
  ));
