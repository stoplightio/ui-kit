import { StateDecorator, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CodeEditor, ICodeEditorProps } from '../../Code/CodeEditor';

const store = new Store({
  value: 'stoplight.uiKit();',
});

export const codeEditorKnobs = (tabName = 'Code Editor'): ICodeEditorProps => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
  onChange: action('onChange'),
  placeholder: text('placeholder', 'placeholder...', tabName),
  showLineNumbers: boolean('showLineNumbers', false, tabName),
  padding: number('padding', 0, {}, tabName),
});

storiesOf('Code:Editor', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <>
      <CodeEditor {...codeEditorKnobs()} onChange={action('onChange')} />
    </>
  ))
  .add('dark', () => (
    <div className="bp3-dark">
      <CodeEditor {...codeEditorKnobs()} onChange={action('onChange')} />
    </div>
  ));

storiesOf('Code:Editor', module)
  .addDecorator(withKnobs)
  .addDecorator(StateDecorator(store))
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
