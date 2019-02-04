/* @jsx jsx */

import { jsx } from '@emotion/core';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box, Button, Checkbox, Flex, Input, Textarea, Toggle } from '../../';
// import { Select } from '../../Select';

storiesOf('Views:Components', module)
  .addDecorator(withKnobs)
  .add('Flex and Box', () => <App />);

const App = () => {
  return (
    <Flex alignItems="center">
      <Box mr="3">
        <Button>Button</Button>
      </Box>

      <Box mr="3">
        <Checkbox />
      </Box>

      <Box mr="3">
        <Toggle />
      </Box>

      <Box mr="3">
        <Input placeholder="placeholder" />
      </Box>

      <Box mr="3">
        <Textarea placeholder="placeholder" />
      </Box>

      <Box mr="3">
        TODO style select
        {/* <Select placeholder="placeholder" /> */}
      </Box>
    </Flex>
  );
};
