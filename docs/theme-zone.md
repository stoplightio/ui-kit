# Theme Zones

A more advanced use case is having different styled versions of the same component within a page or project. This can easily be done by using the `ThemeZone` component and defining a new zone in the theme object.

What follows is a basic example of theming a button in two section of the same page. First lets start with a simple theme. With this this theme, both buttons will have a blue background.

```typescript
// src/theme.ts
import { createThemedModule, ICustomTheme, ITheme, ThemeZones } from '@stoplight/ui-kit';

export type themeZones = 'header' | 'body' | 'fancyButton';

export type themeTypes = IHeaderTheme | IBodyTheme | ICustomTheme;

export interface IHeaderTheme extends ICustomTheme {
  canvas?: {
    bg: string;
    fg: string;
  };
}

export interface IBodyTheme extends ICustomTheme {
  canvas?: {
    bg: string;
    fg: string;
    hoverBg?: string;
    hoverFg?: string;
  };
}

export const { useTheme, ThemeZone, ThemeProvider } = createThemedModule<themeZones, themeTypes>();

export const theme: ITheme = {
  // define theme here
};

export const zones: ThemeZones<themeZones, themeTypes> = {
  header: {
    base: 'dark',

    canvas: {
      bg: '#111',
      fg: 'red',
    },
  },
  body: ({ base }) => ({
    base,

    canvas: {
      bg: base === 'dark' ? 'darkblue' : 'blue',
      fg: 'white',
      hoverBg: 'yellow',
      hoverFg: 'black',
    },
  }),
  fancyButton: {
    button: {
      bg: 'blue',
      fg: 'white',
      hoverBg: 'yellow',
      hoverFg: 'black',
    },
  },
};
```

```typescript jsx
// src/Container.tsx

import * as React from 'react';
import { FunctionComponent } from 'react';
import { Page } from './Page';
import { theme, ThemeProvider, zones } from './theme';

export interface IContainer {}

export const Container: FunctionComponent<IContainer> = props => {
  return (
    <ThemeProvider theme={theme} zones={zones}>
      <Page />
    </ThemeProvider>
  );
};
```

```typescript jsx
// src/Page.tsx

import * as React from 'react';
import { Box, Button, IBox } from '@stoplight/ui-kit';
import { FunctionComponent } from 'react';
import { IBodyTheme, IHeaderTheme, ThemeZone, useTheme } from './theme';

interface IHeaderProps {}

interface IHeader extends IHeaderProps, IBox {}

const Header: FunctionComponent<IHeader> = props => {
  const { children, ...rest } = props;
  const theme = useTheme() as IHeaderTheme;

  return (
    <Box backgroundColor={theme.canvas && theme.canvas.bg} color={theme.canvas && theme.canvas.fg} {...rest}>
      header content
      {children}
    </Box>
  );
};

interface IBodyProps {}

interface IBody extends IBodyProps, IBox {}

const Body: FunctionComponent<IBody> = props => {
  const { children, ...rest } = props;
  const css = bodyStyles({});

  return (
    <Box css={css} {...rest}>
      body content
      {children}
    </Box>
  );
};

const bodyStyles = (props: IBodyProps) => {
  const theme = useTheme() as IBodyTheme;

  return [
    {
      backgroundColor: theme.canvas && theme.canvas.bg,
      color: theme.canvas && theme.canvas.fg,

      ':hover': {
        backgroundColor: theme.canvas && theme.canvas.hoverBg,
        color: theme.canvas && theme.canvas.hoverFg,
      },
    },
  ];
};

export const Page = () => {
  return (
    <div>
      <ThemeZone name="fancyButton">
        <Button>Fancy Button</Button>
      </ThemeZone>

      <ThemeZone name="header">
        <Header>
          <Button>Header Button</Button>
        </Header>
      </ThemeZone>

      <ThemeZone name="body">
        <Body>
          <Button>Body Button</Button>
        </Body>
      </ThemeZone>
    </div>
  );
};
```


For a more full body example, run storybook and see kitchen sink. You can view the code here

[Kitchen Sink](https://github.com/stoplightio/ui-kit/blob/master/src/__stories__/Views/Layout.tsx)

[Example Theme](https://github.com/stoplightio/ui-kit/blob/master/src/theme/dark.ts)
