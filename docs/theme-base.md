# Theme Base

UI-Kit does not contain any base theme on its own, but there are least 2 ways to exchange the common values for spacing, colors etc, which can be used at the same time.

### Custom theme

A preferable solution is to extend a theme. You are allowed to add any extra property to it, so when used wisely, it can be a container for colors and other theme specific values.
Keep in mind, a custom theme may not be the best way to store spacing values, as these are usually not theme specific.
Use of custom theme is recommended as you will have a typed access meaning it's less error-prone.
It's also more explicit, so the reading and maintaining the code may be just easier.

NOTE: All your components must import locally (in scope of project) define useTheme and ThemeZone.

#### Example:

```jsx

import * as React from 'react';
import { Box } from '@stoplight/ui-kit';
import { ThemeProvider } from 'styled-components';
```

### Custom ThemeProvider

You are allowed to supply your own [ThemeProvider](https://github.com/jxnblk/styled-system/blob/master/docs/getting-started.md#theming).
It's flexible enough and a recommended solution for spacing values.

#### Example:

```jsx

import * as React from 'react';
import { Box } from '@stoplight/ui-kit';
import { ThemeProvider } from 'styled-components';

const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

<ThemeProvider theme={theme}>
  <Box px={5} py={3}>
    my left and right paddings are equal to 32px! and top and left equal 16px.
  </Box>
</ThemeProvider>;
```
