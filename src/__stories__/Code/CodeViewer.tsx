import { boolean, withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CodeViewer, ICodeViewerProps } from '../../CodeViewer';

export const codeViewerKnobs = (tabName = 'Code Viewer'): ICodeViewerProps => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
  inline: boolean('inline', false, tabName),
  showLineNumbers: boolean('showLineNumbers', false, tabName),
});

storiesOf('Code:Viewer', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <CodeViewer {...codeViewerKnobs()} />)
  .add('inline', () => <CodeViewer {...codeViewerKnobs()} inline />);
