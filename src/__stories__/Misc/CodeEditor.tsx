/* @jsx jsx */

import { jsx } from '@emotion/core';

import { StateDecorator, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { object, withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { CSSProperties } from 'react';

import { storiesOf, StoryDecorator } from '@storybook/react';
import { CodeEditor, ICodeEditor } from '../../CodeEditor';

const store = new Store({
  value: 'stoplight.uiKit();',
});

export const codeEditorKnobs = (tabName = 'Code Editor'): ICodeEditor => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
  style: object<CSSProperties>('style', { fontSize: '12px' }, tabName),
});

storiesOf('Miscellaneous:CodeEditor', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <CodeEditor {...codeEditorKnobs()} onChange={action('onChange')} />)
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('with store', () => (
    <CodeEditor {...codeEditorKnobs()} value={store.get('value')} onChange={(value: string) => store.set({ value })} />
  ));
