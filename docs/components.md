# Components

All components in this library used styled-components to implement theming, and a subset of style functions from styled-system.

## Create a Component

Create a new component that uses our subset of style functions from styled-system. To start with, add the `fontSize` function to the component's styles argument.

```typescript
import { textColor, styled } from '../utils';

export interface IBoxProps {
  className?: string;
  css?: Object; // a valid javascript style object

  text?: FontSize;
}

export const Box = styled<IBoxProps, 'a'>('a')(fontSize);
```

Now, this component will have the style prop `text` available to set the fontSize css property

```jsx
() => <Box text="sm">Tomato</Box>;
```

Style functions take in the components props as an argument and returns a javascript style object. The theme will be accessible through the props They can easily be defined inline if needed. An example of this is as follows:

```typescript
export interface IBoxProps {
  className?: string;
  css?: Object; // a valid javascript style object

  text?: FontSize;
}

export const Box = styled<IBoxProps, 'a'>('a')({
    border: '1px solid black',
    borderRadius: '9999px',
  }),
  fontSize;
```

If you wanted to add a style that is prop independent this can also be easily done:

```typescript
import { textColor, styled } from '../utils';

export interface IBoxProps {
  className?: string;
  css?: Object; // a valid javascript style object

  text?: FontSize;
  fg?: number;
}

export const Box = styled<IBoxProps, 'a'>('a')(
  {
    border: '1px solid black',
    borderRadius: '9999px',
  },
  fontSize,
  ({ theme, ...props }) => {
    if (!props.fg) return;

    return { color: props.theme.colors[fg] };
  }
);
```

The last way to style an style-component is inline during use. The `css` prop on any styled component can be used to define any styling at that moment. Think of them as html `script` tags, only that the style object gets converted into a classname.

This box has a blue background on hover. The `css` prop supports a variety of pseudo selectors and children options

```jsx
() => (
  <Box css={{ ':hover': { background: 'blue' } }} fg="primary" text="sm">
    Tomato
  </Box>
);
```

### Extending a component

Another common use case is needing to create a more complex styled component from a simpler one. Think extending a component to support more style options. A good example of this is the `Flex` component, which is just a box with more options. There are two way of doing this. The first is to wrap the new component directly around the old.

```typescript
export interface IFlexProps extends IBoxProps {
  items?: 'stretch' | 'center' | 'flex-start' | 'flex-end'; // alignItems
  justify?:  // justifyContent
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'; // flexDirection
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial' | 'inherit'; // flexWrap
}

export const Flex = styled<IFlexProps, 'div'>(Box as any)(
  {
    display: 'flex',
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent
);
```

The second and more explicit was its to difine a small wrapped component that implements the old component. This method is good for when you new component needs not only extra styling but also extra functionality.

```typescript
const FlexBase = (props: IFlexProps) => {
  // make sure to remove nonBox props
  const { items, justify, direction, wrap, ...boxProps } = props;

  return <Box {...boxProps} />;
};

export const Flex = styled<IFlexProps, 'div'>(FlexBase as any)(
  {
    display: 'flex',
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent
);
```
