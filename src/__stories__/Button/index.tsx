import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from '../../components/Button/Button';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Button icon="add" text="Hello" className="m-24" />);
