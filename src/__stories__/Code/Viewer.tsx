import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { IViewer, Viewer } from '../../Code/Viewer';

export const codeViewerKnobs = (tabName = 'Code Viewer'): IViewer => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
});

storiesOf('Code:Viewer', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Viewer {...codeViewerKnobs()} />);
