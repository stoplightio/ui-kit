import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as yup from 'yup';

import { FormInput } from '../../';

storiesOf('FormInput', module)
  .addDecorator(withKnobs)
  .add('with synchronous validation', () => (
    <div className="p-40">
      <FormInputContainer schema={exampleSyncSchema} />
    </div>
  ))
  .add('with async validation', () => (
    <div className="p-40">
      <FormInputContainer schema={exampleAsyncSchema} />
    </div>
  ));

const FormInputContainer: React.FC<{ schema: yup.StringSchema }> = ({ schema }) => {
  const [value, setValue] = React.useState('');

  return (
    <FormInput
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      schema={schema}
    />
  );
};

const exampleSyncSchema = yup.string().min(3, 'waaay too short').max(5, 'waaay too long');

const exampleAsyncSchema = yup.string().test('oddchars', 'The number of characters must be odd', value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value.length % 2 === 1);
    }, 1000);
  });
});
