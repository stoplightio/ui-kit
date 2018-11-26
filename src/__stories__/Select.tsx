import * as React from 'react';

import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { Box } from '../Box';
import { Select } from '../Select';

export const selectKnobs = (tabName = 'Select') => ({
  options: [],
  menuIsOpen: boolean('menuIsOpen', true),
  multi: boolean('multi', false),
  loading: boolean('loading', false),
  disabled: boolean('disabled', false),
  clearable: boolean('clearable', false),
  searchable: boolean('searchable', false),
  placeholder: text('placeholder', 'placeholder'),
  loadingMessage: text('loadingMessage', 'loadingMessage'),
  noOptionsMessage: text('noOptionsMessage', 'noOptionsMessage'),
  minMenuHeight: number('minMenuHeight', 140),
  maxMenuHeight: number('maxMenuHeight', 300),
  menuPlacement: select('menuPlacement', ['auto', 'bottom', 'top'], 'auto'),
  blurOnSelect: boolean('blurOnSelect', false),
  closeOnSelect: boolean('closeOnSelect', false),
  closeOnScroll: boolean('closeOnScroll', false),
  hideSelectedOptions: boolean('hideSelectedOptions', false),
  backspaceRemovesValue: boolean('backspaceRemovesValue', true),
});

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box width="25%">
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
    <Box width="25%">
      <Select {...selectKnobs()} options={[]} />
    </Box>
  ));
