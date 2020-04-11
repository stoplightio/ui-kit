import './_theme-overwrite.scss';

import * as React from 'react';

import { Button, CodeViewer, ThemeContainer } from '../../';

export default () => (
  <div className="m-20">
    <div>Don't like the stoplight color pallete? Overwrite theme in your applications!!</div>
    <div>
      To overwrite our variables you must be using SCSS. Then in whatever file you import our scss, define an $sl-config
      ABOVE the import, then replace with whatever values. Example below:
    </div>
    <CodeViewer
      value={`/*main.scss*/

$sl-config: (
  colors: (
    success: red,
  ),
);

@import '~@stoplight/ui-kit/src/styles/ui-kit';
`}
    />

    {/* we are using the namespace prop so we don't overwrite the them in our other stories */}
    <ThemeContainer namespace="namespace">
      <Button intent="success">success is red</Button>
    </ThemeContainer>
  </div>
);
