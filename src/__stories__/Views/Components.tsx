import * as React from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Checkbox, Flex, Icon, IconLibrary, Input, Textarea, Toggle } from '../../';
import { Select } from '../../Select';

IconLibrary.add(faPlus);

const knobs = () => ({
  invalid: boolean('invalid', false),
  disabled: boolean('disabled', false),
});

storiesOf('Views:Components', module)
  .addDecorator(withKnobs)
  .add('Form Components', () => <App />);

const App = () => {
  return (
    <Flex alignItems="center">
      <Box mr="3">
        <Button {...knobs()}>Button</Button>
      </Box>

      <Box mr="3">
        <Button {...knobs()}>
          <Icon icon="plus" />
        </Button>
      </Box>

      <Box mr="3">
        <Checkbox {...knobs()} />
      </Box>

      <Box mr="3">
        <Toggle {...knobs()} />
      </Box>

      <Box mr="3">
        <Input placeholder="placeholder" {...knobs()} />
      </Box>

      <Box mr="3">
        <Textarea placeholder="placeholder" {...knobs()} />
      </Box>

      <Box mr="3">
        <Select placeholder="select" {...knobs()} options={['1', '2', '3', '4'].map(x => ({ value: x, label: x }))} />
      </Box>

      <Box mr="3">
        <Select
          placeholder="select-multi"
          {...knobs()}
          isMulti={true}
          options={['1', '2', '3', '4'].map(x => ({ value: x, label: x }))}
        />
      </Box>
    </Flex>
  );
};
