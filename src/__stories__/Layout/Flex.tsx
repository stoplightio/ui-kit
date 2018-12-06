import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Box, Flex, IFlex } from '../../';
import { AlignItems, FlexDirection, FlexWrap, JustifyContent } from '../_utils';
import { boxKnobs } from './Box';

export const flexKnobs = (tabName = 'Flex'): IFlex => ({
  ...boxKnobs(),
  items: select('items', AlignItems, '', tabName),
  justify: select('justify', JustifyContent, '', tabName),
  direction: select('direction', FlexDirection, '', tabName),
  wrap: select('wrap', FlexWrap, '', tabName),
});

storiesOf('Layout/Flex', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Flex {...flexKnobs()}>
      <Box flex={1} border="@xs">
        Flex 1
      </Box>
      <Box flex={1} border="@xs">
        Flex 1
      </Box>
      <Box flex={2} border="@xs">
        Flex 2
      </Box>
    </Flex>
  ));
