import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { AlignItems, FlexDirection, FlexWrap, JustifyContent } from './_utils';
import { boxKnobs } from './Box';

export const flexKnobs = (tabName = 'Flex') => {
  return {
    items: select('items', AlignItems, undefined, tabName),
    justify: select('justify', JustifyContent, undefined, tabName),
    direction: select('direction', FlexDirection, undefined, tabName),
    wrap: select('wrap', FlexWrap, undefined, tabName),
  };
};

storiesOf('components/Flex', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Flex {...flexKnobs()} {...boxKnobs()}>
      <Box flex={1} border="xs">
        Flex 1
      </Box>
      <Box flex={1} border="xs">
        Flex 1
      </Box>
      <Box flex={2} border="xs">
        Flex 2
      </Box>
    </Flex>
  ));
