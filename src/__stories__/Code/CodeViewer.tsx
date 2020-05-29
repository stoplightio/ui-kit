import { boolean, text, withKnobs } from '@storybook/addon-knobs';
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
  .add('dark', () => (
    <div className="bp3-dark">
      <CodeViewer {...codeViewerKnobs()} />
    </div>
  ))
  .add('inline', () => <CodeViewer {...codeViewerKnobs()} inline />)
  .add('xss', () => (
    <CodeViewer
      className="overflow-auto MV_block"
      value={`Hello, I am some *Markdown*\n<p>I contain some *evil* HTML!</p>\n<img src="asd" onerror="alert('evil code!')" />`}
      language="markdown"
      showLineNumbers={false}
    />
  ));
