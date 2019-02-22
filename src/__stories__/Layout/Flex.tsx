import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as ss from 'styled-system';

import { Box, Flex, IFlex } from '../../';
import { AlignItems, FlexDirection, FlexWrap, JustifyContent } from '../_utils';
import { boxKnobs } from './Box';

export const flexKnobs = (tabName = 'Flex'): IFlex => ({
  ...boxKnobs(),
  alignItems: select('alignItems', AlignItems, '', tabName),
  justifyContent: select('justifyContent', JustifyContent, '', tabName),
  flexDirection: select('flexDirection', FlexDirection, '', tabName) as ss.FlexDirectionProps['flexDirection'],
  flexWrap: select('flexWrap', FlexWrap, '', tabName) as ss.FlexWrapProps['flexWrap'],
});

storiesOf('Layout:Flex', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Flex {...flexKnobs()} width="500px" border="1px solid blue">
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
