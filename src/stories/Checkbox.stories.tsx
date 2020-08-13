// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Checkbox, ICheckboxProps } from '@blueprintjs/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';

export default ({
  title: 'Example/Checkbox',
  component: Checkbox,
  argTypes: {},
} as unknown) as Meta;

const Template: Story<ICheckboxProps> = args => <Checkbox {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: 'Checkbox',
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checkbox',
  checked: true,
};
