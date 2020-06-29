import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CodeViewer, ICodeViewerProps } from '../../CodeViewer';

export const codeViewerKnobs = (tabName = 'Code Viewer'): ICodeViewerProps => ({
  language: text('language', 'jsx', tabName),

  value: text(
    'value',
    `function Clock(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    function defaultValue = stoplight.io();
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}`,
    tabName,
  ),

  inline: boolean('inline', false, tabName),
  showLineNumbers: boolean('showLineNumbers', false, tabName),
});

storiesOf('Code:Viewer', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(storyFn => <div style={{ height: '100vh' }}>{storyFn()}</div>)
  .add('with defaults', () => <CodeViewer {...codeViewerKnobs()} />)
  .add('dark', () => (
    <div className="bp3-dark">
      <CodeViewer {...codeViewerKnobs()} />
    </div>
  ))
  .add('inline', () => <CodeViewer {...codeViewerKnobs()} inline />);
