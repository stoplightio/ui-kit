import { FormGroup } from '@blueprintjs/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as yup from 'yup';

import { FormButton } from '../../FormButton';
import { FormInput } from '../../FormInput';

storiesOf('FormButton', module).add('validation', () => {
  return (
    <div className="p-40">
      <ExampleContainer />
    </div>
  );
});

const ExampleContainer: React.FC = () => {
  const [field1, setField1] = React.useState('');
  const [field2, setField2] = React.useState('');

  const totalData = React.useMemo(
    () => ({
      field1,
      field2,
    }),
    [field1, field2],
  );

  return (
    <div>
      <FormGroup label="Field 1 - Name">
        <FormInput
          value={field1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField1(e.currentTarget.value)}
          schema={field1Schema}
        />
      </FormGroup>
      <FormGroup label="Field 2 - Email">
        <FormInput
          value={field2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField2(e.currentTarget.value)}
          schema={field2Schema}
        />
      </FormGroup>
      <FormButton onClick={() => alert('hey')} data={totalData} schema={totalSchema} text="Submit" />
    </div>
  );
};

const field1Schema = yup.string().min(2, 'Min 2 characters');
const field2Schema = yup.string().email();
const totalSchema = yup.object().shape({
  field1: field1Schema,
  field2: field2Schema,
});
