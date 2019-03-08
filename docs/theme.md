# Theme

The theme object gets passed to a provider and is accessible by styled components.
It is helpful to either define constants and pass them around or use it for dynamic styling that will update with user input.
You are welcome to extend the theme and add new properties you might need, such as canvas.

The theme object is quite flat and just a foundation for end-applications.
It covers specific components needs' and do not provide any default spacings and such.

## Interfaces/Types

#### BaseTheme

```typescript
export type BaseTheme = 'dark' | 'light';
```

#### ITheme

```typescript
export interface ITheme {
  base: BaseTheme;

  checkbox: {
    fg: string;
    bg: string;
    checkedBg: string;
  };

  contextMenu: {
    fg: string;
    bg: string;
    border: string;
    hoverFg: string;
    hoverBg: string;
  };

  blockQuote: {
    fg?: string;
    bg?: string;
    border: string;
    shadow: string;
  };

  button: {
    fg: string;
    bg: string;
    hoverBg: string;
  };

  input: {
    fg: string;
    bg?: string;
    border?: string;
  };

  codeEditor: {
    bg: string;
    border: string;

    syntax: {
      primary: string;
      secondary: string;
      comment: string;
      punctuation: string;
      keyword: string;
      function: string;
      variable: string;
      operator: string;
      regex: string;
    };
  };

  link: {
    fg: string;
    hoverFg?: string;
    visitedFg?: string;
  };

  scrollbar: {
    bg: string;
  };

  menu: {
    fg: string;
    bg: string;
    border: string;
    hoverFg: string;
    hoverBg: string;
  };

  select: {
    fg: string;
    bg: string;
    border: string;

    chip: {
      fg: string;
      bg: string;
    };

    indicator: {
      fg: string;
    };

    menu: {
      fg: string;
      bg: string;

      selectedFg: string;
      selectedBg: string;

      activeFg: string;
      activeBg: string;

      hoverFg: string;
      hoverBg: string;
    };
  };

  table: {
    fg: string;
    bg?: string;
    border: string;
    shadow: string;
  };

  textarea: {
    fg: string;
    bg?: string;
    border?: string;
  };

  toggle: {
    fg: string;
    bg: string;
    border: string;
    checkedFg: string;
    checkedBg: string;
    checkedBorder: string;
  };
}

```

#### ICustomTheme

Custom theme is just a subset of Theme. It may override any property present on ITheme.

```typescript
export interface ICustomTheme extends DeepPartial<ITheme> {
  base: BaseTheme;
}
```
