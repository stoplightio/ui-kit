import '../styles/_ui-kit.scss';

import { FormGroup } from '@blueprintjs/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';

import { SecretInput, SecretInputProps } from '../SecretInput';

export default ({
  title: 'Example/SecretInput',
  component: SecretInput,
  argTypes: {},
} as unknown) as Meta;

const Template: Story<SecretInputProps & { helperText: React.ReactNode }> = ({ helperText, ...args }) => (
  <div className="p-40">
    <FormGroup helperText={helperText}>
      <SecretInput {...args} />
    </FormGroup>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  value: 'password',
  helperText: (
    <span>
      A <code>SecretInput</code> is a regular <code>InputGroup</code> and takes all the same props, but has a predefined{' '}
      <code>rightElement</code> button that toggles <code>type</code> between "text" and "password".
    </span>
  ),
};

export const SelectOnFocus = Template.bind({});
SelectOnFocus.args = {
  leftIcon: 'lock',
  selectOnFocus: true,
  value: '01234567890123456789012345678912',
  helperText: (
    <span>
      Use the <code>selectOnFocus</code> prop to assist users when you expect the most common interactions will be to
      copy or replace the entire value.
    </span>
  ),
};
