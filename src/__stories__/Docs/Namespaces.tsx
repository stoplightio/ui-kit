import './_theme-namespace.scss';

import * as React from 'react';

import { Button, CodeViewer, ThemeContainer } from '../..';

export default () => (
  <div className="m-20">
    <div className="mb-10">
      Your theme is now customized, but maybe you need to two different instances of the color "primary". This can be
      done with clever namespacing! (this is an advanced feature and should be used with caution, also using this
      feature will currently bloat your css until we optimize)
    </div>
    <div>
      To use namespaces simply overwrite and import the theme like you normally would, but nested inside of a unique
      class! Then use our ThemeContainer Component with the namespace prop equal to your new classname.
    </div>
    <CodeViewer
      value={`/*main.scss*/

/**applied with <ThemeContainer namespace="namespace-1">*/
.namespace-1 {
  $sl-config: (
    colors: (
      success: blue,
    ),
  );

  @import '~@stoplight/ui-kit';
}

/**applied with <ThemeContainer namespace="namespace-2">*/
.namespace-2 {
  $sl-config: (
    colors: (
      success: red,
    ),
  );

  @import '~@stoplight/ui-kit';
}
`}
    />

    <Button intent="success">success is normal</Button>

    <ThemeContainer namespace="namespace-1">
      <Button intent="success">success is blue</Button>
    </ThemeContainer>

    <ThemeContainer namespace="namespace-2">
      <Button intent="success">success is red</Button>
    </ThemeContainer>
  </div>
);
