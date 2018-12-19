# Theming Components

Depending on the component, theming might be slightly different. But for the most part a component theme will have a combination of the three:

- **fg:** used for defining text AND border color
- **bg:** used for defining background color
- **border:** used for defining just border color

Border is less common than bg and bg, but common enough to mention it.

If a component is expected to have a state, such as hover/focus/active, you may provide such values either.
The convention is quite simple:

- **stateFg:** used for defining text AND border color
- **stateBg:** used for defining background color
- **stateBorder:** used for defining just border color

i.e. `hoverBg`, `hoverFg`, `hoverBorder`.

An example of a simple component that uses all three is Context Menu. The theme for a context menu might look something like this:

```jsx
export const theme: ICustomTheme = {
    contextMenu: {
      fg: 'white',
      bg: 'grey',
      border: 'red',
      hoverFg: 'green',
      hoverBg: 'blue',
    };
};
```

There are more complex components the above pattern might not be completely applicable. An example of a more complex component is the select component. The select component consists of an input, chips (how the selected values appear in the input), a menu of options that can appear selected or not.

For complex components the pattern is similar but contains subsections still containing a combination of fg, bg, and border. (this is temporary and subject to change)

```jsx
export const theme: ISectionTheme = {
  components: {
    select: {
      fg: 'black',
      bg: 'white',
      border: 'black',

      chip: {
        bg: 'grey',
        border: 'transparent',
      },

      selectedMenuItem: {
        fg: 'white',
        bg: 'blue',
        border: 'transparent',
      },
    },
  },
};
```
