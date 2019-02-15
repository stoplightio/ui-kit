import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { array, boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Box } from '../../Box';
import { ISelect, Select } from '../../Select';

export const selectKnobs = (tabName = 'Select'): ISelect => ({
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
  onChange: action('onChange'),
  invalid: boolean('invalid', false),
});

storiesOf('Forms:Select', module)
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
  ))
  .add('async', () => (
    <Box width="40%">
      <Select
        {...selectKnobs()}
        defaultOptions={[{ label: 'option1', value: 2 }]}
        loadOptions={inputValue => {
          return new Promise(resolve => {
            setTimeout(
              resolve,
              500,
              [0, 1, 2, 3].map(index => ({
                label: `${inputValue}${index}`,
                value: index,
              }))
            );
          });
        }}
      />
    </Box>
  ))
  .add('creatable multi', () => (
    <Box width="40%">
      <Select
        {...selectKnobs()}
        isMulti={true}
        allowCreate={true}
        defaultOptions={[{ label: 'option1', value: 2 }]}
        options={array('options', ['1', '2', '3', '4']).map(x => ({ value: x, label: x }))}
      />
    </Box>
  ))
  .add('creatable async', () => (
    <Box width="40%">
      <Select
        {...selectKnobs()}
        allowCreate={true}
        defaultOptions={[{ label: 'option1', value: 2 }]}
        loadOptions={inputValue => {
          return new Promise(resolve => {
            setTimeout(
              () =>
                resolve(
                  [0, 1, 2, 3].map(index => ({
                    label: `${inputValue}${index}`,
                    value: `${index}`,
                  }))
                ),
              250
            );
          });
        }}
      />
    </Box>
  ));
