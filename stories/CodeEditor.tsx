// @ts-ignore
import { StateDecorator, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { object, withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CodeEditor } from '../src/CodeEditor';

const store = new Store({
  code: 'stoplight.uiKit();',
});

export const codeEditorKnobs = (tabName = 'CodeEditor') => {
  return {
    language: text('language', 'js', tabName),
    style: object('style', { fontSize: '12px' }, tabName),
  };
};

storiesOf('CodeEditor', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <CodeEditor {...codeEditorKnobs()} onChange={action('onChange')} />)
  .addDecorator(StateDecorator(store))
  .add('with store', () => (
    <CodeEditor {...codeEditorKnobs()} code={store.get('code')} onChange={(code: string) => store.set({ code })} />
  ));
