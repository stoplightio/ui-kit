import * as React from 'react';

import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { Box } from '../Box';
import { Select } from '../Select';

export const selectKnobs = (tabName = 'Select') => ({
  options: [],
  multi: boolean('multi', false),
  loading: boolean('loading', false),
  disabled: boolean('disabled', false),
  clearable: boolean('clearable', true),
  searchable: boolean('searchable', true),
  placeholder: text('placeholder', 'choose...'),
  loadingMessage: text('loadingMessage', 'loadingMessage'),
  noOptionsMessage: text('noOptionsMessage', 'no results'),
  minMenuHeight: number('minMenuHeight', 140),
  maxMenuHeight: number('maxMenuHeight', 300),
  menuPlacement: select('menuPlacement', ['auto', 'bottom', 'top'], 'auto'),
  blurOnSelect: boolean('blurOnSelect', true),
  closeOnSelect: boolean('closeOnSelect', true),
  closeOnScroll: boolean('closeOnScroll', false),
  hideSelectedOptions: boolean('hideSelectedOptions', false),
  backspaceRemovesValue: boolean('backspaceRemovesValue', true),
});

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box width="40%">
      <Select
        {...selectKnobs()}
        options={[
          { label: 'option1', value: 1 },
          { label: 'option2', value: 2 },
          { label: 'option3', value: 3 },
          { label: 'option4', value: 4 },
          { label: 'option5', value: 5 },
        ]}
      />
    </Box>
  ))
  .add('No Options', () => (
    <Box width="40%">
      <Select {...selectKnobs()} options={[]} />
    </Box>
  ));
