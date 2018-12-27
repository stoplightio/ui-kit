# Migrating to UI-Kit

The migration process will usually vary quite a lot. There are a couple of rules and principles that apply to all cases, though.

These are:
* each component should be themeable and use theme helper
* each component should have isolated styles - don't use classes for styling
* each component should be fairly customizable and flexible
* new components should use new React hooks
* use `jsx` from emotion in favor of React.createElement

There is a [converter](https://github.com/stoplightio/ui-kit-converter) that may help transition your project.
It rewrites inline styles and resolves classes based on given stylesheet, adds JSX pragma and needed UI-Kit's imports.
