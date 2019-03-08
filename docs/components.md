# Components

All components in this library use Emotion to implement styling, and a subset of style functions from styled-system.
Theming is accomplished via ThemeZones that rely on React's context.


## Extending a component

It's advisable (let's say compulsory) to base off your new component on `Box/Flex/Text`, which are foundational components
for almost all styled components in UI-Kit.

This will guarantee your props will be properly passed and a ref will be forwarded.

```typescript jsx

import * as React from 'react';
import { Box, IBox } from '@stoplight/ui-kit';
import { FunctionComponent } from 'react';

export interface IAlertProps {
  state: 'error' | 'warning' | 'success';
}

export interface IAlert extends IAlertProps, IBox {}

const Alert: FunctionComponent<IAlert> = props => {
  const { children, state, ...rest } = props;
  const css = alertStyles({ state });

  return (
    <Box css={css} {...rest}>
      {children}
    </Box>
  );
};

export const alertStyles = ({ state }: IAlertProps) => {
  return [
    {
      color: state === 'error' || state === 'warning' ? 'orange' : 'green',
      backgroundColor: 'black',
    },
  ];
};

export { Alert };

```

Now, the component can be used as follows

```jsx
<Alert state="success">Everything is fine</Alert>
```

You can also pass an event handler, i.e.

```jsx
<Alert onClick={() => console.log('click!')} state="success">
  Everything is fine
</Alert>
```

or some custom style, i.e.

```jsx
<Alert fontSize="20px" textTransform="uppercase" state="error">
  error
</Alert>
```

Note: in order to let React Dev Tools show the component correctly (instead of an ugly `<Unknown/>`) it is important to
**not** export and declare the component in the same statement.

#### Don't

```tsx
export const Alert: FunctionComponent<IAlert> = props => {}
```

#### Do

```tsx
const Alert: FunctionComponent<IAlert> = props => {

export { Alert };
```

In case of a `React.forwardRef`, make sure to use a named function and to set the component's display name


#### Don't

```tsx
export const BlockQuote: React.FunctionComponent<IBlockQuote> = React.forwardRef<{}>((props, ref) => {{}}
```

#### Do

```tsx
const BlockQuote: React.FunctionComponent<IBlockQuote> = React.forwardRef<{}>(function BlockQuote(props, ref) {{}}
BlockQuote.displayName = 'BlockQuote';

export { BlockQuote };
```

## Creating a component

In most cases you should refer to [Extending a component](#extending-a-component) section.
A vast amount of components are based on Box, so you won't really need to reinvent the wheel every time.
If you build a more complex component, such as Toggle, wrap some other React component specific (i.e. Code Editor or Select) or just have a very specific use case, you may prefer not to base the new component on Box.

There is no general rule how to implement such a component - it's strictly related to a use case.

It's all about having a common sense here.

Just think what's actually needed, how much customizable it's supposed be etc.

You can refer to:

- [Context Menu](https://github.com/stoplightio/ui-kit/blob/master/src/ContextMenu.tsx)
- [Code Editor](https://github.com/stoplightio/ui-kit/blob/master/src/CodeEditor.tsx)
- [Menu](https://github.com/stoplightio/ui-kit/blob/master/src/Menu.tsx)
- [Select](https://github.com/stoplightio/ui-kit/blob/master/src/Select.tsx)
- [Toggle](https://github.com/stoplightio/ui-kit/blob/master/src/Toggle.tsx)
