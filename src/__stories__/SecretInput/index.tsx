import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { FormGroup, SecretInput } from '../../';

storiesOf('SecretInput', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => {
    return (
      <div className="p-40">
        <FormGroup
          helperText={
            <span>
              A <code>SecretInput</code> is a regular <code>InputGroup</code> and takes all the same props, but has a
              predefined <code>rightElement</code> button that toggles <code>type</code> between "text" and "password".
            </span>
          }
        >
          <SecretInput value="password" />
        </FormGroup>
      </div>
    );
  })
  .add('with icon and selectOnFocus', () => {
    return (
      <div className="p-40">
        <FormGroup
          label="Secret UUID Token"
          helperText={
            <span>
              Use the <code>selectOnFocus</code> prop to assist users when you expect the most common interactions will
              be to copy or replace the entire value.
            </span>
          }
        >
          <SecretInput leftIcon="lock" selectOnFocus={true} value="01234567890123456789012345678912" />
        </FormGroup>
      </div>
    );
  });
