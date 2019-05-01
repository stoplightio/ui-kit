import { StateDecorator, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf, StoryDecorator } from '@storybook/react';
import * as React from 'react';

import { CodeEditor, ICodeEditorProps } from '../../CodeEditor';

const store = new Store({
  value: 'stoplight.uiKit();',
});

export const codeEditorKnobs = (tabName = 'Code Editor'): ICodeEditorProps => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
  onChange: action('onChange'),
  placeholder: text('placeholder', 'placeholder...', tabName),
});

storiesOf('Code:Editor', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <>
      <CodeEditor {...codeEditorKnobs()} onChange={action('onChange')} />
    </>
  ));

storiesOf('Code:Editor', module)
  .addDecorator(withKnobs)
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('with store', () => (
    <CodeEditor {...codeEditorKnobs()} value={store.get('value')} onChange={(value: string) => store.set({ value })} />
  ))
  .add('with store autofocus', () => (
    <CodeEditor
      {...codeEditorKnobs()}
      value={store.get('value')}
      onChange={(value: string) => store.set({ value })}
      autoFocus
    />
  ));
