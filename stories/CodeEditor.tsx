import { action } from '@storybook/addon-actions';
import { object, withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CodeEditor } from '../src/';

export const codeEditorKnobs = (tabName = 'CodeEditor') => {
  return {
    language: text('language', 'js', tabName),
    initialCode: text('initialCode', '', tabName),
    style: object('style', { fontSize: '12px' }, tabName),
  };
};

storiesOf('CodeEditor', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <CodeEditor {...codeEditorKnobs()} onCodeChange={action('onCodeChange')} />);
