import * as React from 'react';

import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { storiesOf, StoryDecorator } from '@storybook/react';
import omit = require('lodash/omit');

import { forwardRef } from 'react';
import { useAutoFocus } from '../../hooks/useAutoFocus';
import { IInput, Input } from '../../Input';
import { AutosizeInputType, cleanKnobs, InlineInputType } from '../_utils';
import { boxKnobs } from '../Layout/Box';

const store = new Store({
  value: 'Input Text',
});

const CustomInput = forwardRef<HTMLInputElement, IInput>(function CustomInput({ autoFocus, ...props }, ref) {
  const [nodeRef] = useAutoFocus<HTMLInputElement>(autoFocus, ref);

  return <Input {...props} ref={nodeRef} />;
});

export const inputKnobs = (tabName = 'Input'): IInput => {
  return cleanKnobs({
    ...omit(boxKnobs(), 'opacity'),
    disabled: boolean('disabled', false, tabName),
    type: select('type', InlineInputType, 'text', tabName),
    placeholder: text('placeholder', 'placeholder', tabName),
    invalid: boolean('invalid', false, tabName),
  });
};

export const autosizeInputKnobs = (tabName = 'Input'): IInput => {
  return cleanKnobs({
    ...inputKnobs(),
    type: select('type', AutosizeInputType, 'text', tabName),
  });
};

storiesOf('Forms|Input', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Input {...inputKnobs()} />)
  .add('uncontrolled autofocus', () => <Input {...inputKnobs()} autoFocus />)
  .add('autosize', () => <Input {...autosizeInputKnobs()} autosize />)
  .add('autosize autofocus', () => <Input {...autosizeInputKnobs()} autosize autoFocus />)
  .add('with controlled autofocus', () => (
    <CustomInput {...inputKnobs()} autoFocus={boolean('autoFocus', true, 'Input')} />
  ))
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('controlled set', () => <Input {...inputKnobs()} value="not editable" />)
  .add('controlled store', () => (
    <Input
      {...inputKnobs()}
      value={store.get('value')}
      onChange={(event: React.SyntheticEvent<HTMLInputElement>) => store.set({ value: event.currentTarget.value })}
    />
  ));
