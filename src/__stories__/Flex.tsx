import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { Box } from '../Box';
import { Flex } from '../Flex';
import { AlignItems, FlexDirection, FlexWrap, JustifyContent } from './_utils';
import { boxKnobs } from './Box';

export const flexKnobs = (tabName = 'Flex'): any => {
  return omitBy(
    {
      items: select('items', AlignItems, '', tabName),
      justify: select('justify', JustifyContent, '', tabName),
      direction: select('direction', FlexDirection, '', tabName),
      wrap: select('wrap', FlexWrap, '', tabName),
    },
    val => !val
  );
};

storiesOf('Flex', module)
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
