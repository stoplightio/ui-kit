# Theming Sections

A more advanced use case is having different styled versions of the same component within a page or project. This can easily be done by using the `ThemeSection` component and defining a new section in the theme object.

What follows is a basic example of theming a button in two section of the same page. First lets start with a simple theme. With this this theme, both buttons will have a blue background.

```jsx
// THEME
const theme = {
  colors: {
    primary: 'blue',
  },

  components: {
    button: {
      bg: '#/colors/primary',
    },
  },
};

// PAGE
export const Page = () => {
  return (
    <div>
      <Button>Blue Button</Button>

      <ThemeSection section="header">
        <Button>Blue Button</Button>
      </ThemeSection>

      <ThemeSection section="body">
        <Button>Blue Button</Button>
      </ThemeSection>
    </div>
  );
};
```

Next, by defining header and body sections in the theme respectively, we can override the default blue button. This can be done in two way. The first is to define a section with a button component and change the bg property. The other is to change the value of primary (it is best to avoid changing colors directly as it could change other components within a section without being careful)

```jsx
// THEME
const theme = {
  colors: {
    primary: 'blue'
  },

  components: {
    button: {
      bg: 'red',
    },
  }

  sections: {
    // changes button directly
    header: {
      components: {
        button: {
          bg: '#/colors/primary',
        },
      }
    },

    // changes the value of primary
    body: {
      colors: {
        primary: 'green'
      },
    }
  }
}

// PAGE
export const Page = () => {
  return (
    <div>
      <Button>Blue Button</Button>

      <ThemeSection section="header">
        <Button>Red Button</Button>
      </ThemeSection>

      <ThemeSection section="body">
        <Button>Green Button</Button>
      </ThemeSection>
    </div>
  )
}
```

For a more full body example, run storybook and see kitchen sink. You can view the code here

[Kitchen Sink](https://github.com/stoplightio/ui-kit/blob/SL-140/basic-components/src/components/__stories__/KitchenSink.tsx)

[Example Theme](https://github.com/stoplightio/ui-kit/blob/SL-140/basic-components/.storybook/themes/dark.ts)
