import { boolean, withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Box } from '../../Box';
import { IViewer, Viewer } from '../../Code/Viewer';

export const codeViewerKnobs = (tabName = 'Code Viewer'): IViewer => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
  inline: boolean('inline', false, tabName),
  showLineNumbers: boolean('showLineNumbers', false, tabName),
});

storiesOf('Code:Viewer', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box maxWidth="500px">
      <Viewer {...codeViewerKnobs()} />
    </Box>
  ))
  .add('inline', () => (
    <Box maxWidth="500px">
      <Viewer {...codeViewerKnobs()} inline />
    </Box>
  ));
