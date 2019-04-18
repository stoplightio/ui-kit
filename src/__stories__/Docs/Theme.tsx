import * as React from 'react';

import { Button, ThemeContainer } from '../../components';
import { CodeViewer } from '../../components/Code';

import './_example.scss';

export default () => (
  <div className="m-20">
    <div>Don't like the stoplight color pallete? Overwrite theme in your applications!!</div>
    <div>
      To overwrite our variables you must be using SCSS. Then in whatever file you import our scss, define an $sl-config
      ABOVE the import, then replace with whatever values. Example below:
    </div>
    <CodeViewer
      value={`
/*main.scss*/

$sl-config: (
  namespace: new-theme
  colors: (
    primary: red,
  ),
);

@import '~@stoplight/ui-kit/src/styles/ui-kit';
`}
    />

    <ThemeContainer namespace="new-theme">
      <Button intent="primary">primarry is red!</Button>
    </ThemeContainer>
  </div>
);
