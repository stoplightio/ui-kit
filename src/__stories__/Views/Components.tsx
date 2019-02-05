/* @jsx jsx */

import { jsx } from '@emotion/core';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box, Button, Checkbox, Flex, Input, Textarea, Toggle } from '../../';
import { Select } from '../../Select';

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
        <Select placeholder="select" options={['1', '2', '3', '4'].map(x => ({ value: x, label: x }))} />
      </Box>

      <Box mr="3">
        <Select
          placeholder="select-multi"
          isMulti={true}
          options={['1', '2', '3', '4'].map(x => ({ value: x, label: x }))}
        />
      </Box>
    </Flex>
  );
};
