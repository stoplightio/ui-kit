import { StateDecorator, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf, StoryDecorator } from '@storybook/react';
import * as React from 'react';

import { Editor, IEditor } from '../../Code/Editor';

const store = new Store({
  value: 'stoplight.uiKit();',
});

export const codeEditorKnobs = (tabName = 'Code Editor'): IEditor => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
  onChange: action('onChange'),
});

storiesOf('Code:Editor', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Editor {...codeEditorKnobs()} onChange={action('onChange')} />)
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('with store', () => (
    <Editor {...codeEditorKnobs()} value={store.get('value')} onChange={(value: string) => store.set({ value })} />
  ))
  .add('with store autofocus', () => (
    <Editor
      {...codeEditorKnobs()}
      value={store.get('value')}
      onChange={(value: string) => store.set({ value })}
      autoFocus
    />
  ));
