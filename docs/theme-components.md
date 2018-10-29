# Theming Components

Depending on the component, theming might be slightly different. But for the most part a component theme will have a combination of the three:

- **fg:** used for defining text AND border color
- **bg:** used for defining background color
- **border:** used for defining just border color

an example of a simple component that uses all three is button. The theme for a button might look something like this:

```jsx
export const theme: ISectionTheme = {
  colors: {
    transparent: 'transparent',
  },

  components: {
    button: {
      fg: 'white',
      bg: 'grey',
      border: '#/colors/transparent',
    },
  },
};
```

Not every component will use all three, and for more complex components the above pattern might not be completely applicable. An example of a more complex component is the select component. The select component consists of an input, chips (how the selected values appear in the input), a menu of options that can appear selected or not.

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
