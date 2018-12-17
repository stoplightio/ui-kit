# UI-KIT

[![Maintainability](https://api.codeclimate.com/v1/badges/f0df5b38120a6471be33/maintainability)](https://codeclimate.com/repos/5bdb489c9a98842d0a00d211/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f0df5b38120a6471be33/test_coverage)](https://codeclimate.com/repos/5bdb489c9a98842d0a00d211/test_coverage)

Stoplight ui-kit is a shared component library that contains basic components built using styled-components. All components should support overridable theming from a theme object, and also come with default styling from our prepackaged theme.

- Explore the components: [Storybook](https://stoplightio.github.io/ui-kit/)
- View the changelog: [Releases](https://github.com/stoplightio/ui-kit/releases)

### Installation

```bash
# latest stable + required dependencies
yarn add @stoplight/ui-kit react react-dom lodash
```

### Usage

TODO

## API Reference

- [Theme](./docs/theme.md)
  - [base](./docs/theme-base.md)
  - [components](./docs/theme-components.md)
  - [sections](./docs/theme-section.md)
- [Components](./docs/components.md)
  - [Creating a component](./docs/components.md#create-a-component)
  - [Extending a styled component](./docs/components.md#extending-a-component)
  - Component List
    - BlockQuote
    - Box
    - Break
    - Button
    - Code Editor
    - Context Menu
    - Flex
    - Heading
    - Icon
    - Image
    - Input
    - Link
    - List
    - Mark
    - Menu
    - Popup
    - Portal
    - ScrollBox
    - ScrollList
    - Select
    - Table
    - Text
    - Textarea
    - Toggle

## Helpful Links

- Guideline for "good" Storybook stories: https://blog.hichroma.com/the-delightful-storybook-workflow-b322b76fd07

- Styled Components

  - [Git Repo](https://github.com/styled-components/styled-components)
  - [Documentation](https://www.styled-components.com/docs)

- Styled System

  - [Git Repo](https://github.com/jxnblk/styled-system)
  - [Site](https://jxnblk.com/styled-system/)

### Contributing

1. Clone repo
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch
3. Install deps: `yarn setup`
4. Make your changes
5. Run tests: `yarn test.prod`
6. Stage relevant files to git
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`
9. Open PR targeting the `develop` branch

Run the storybook server to explore components:

```bash
yarn storybook
```

### Linking to another package

```bash
# install dependencies
yarn setup

# create a dist build
yarn build

# change to the dist directory
cd dist

# setup the yarn link
yarn link

# change to your other package
cd ../another/package

# link ui-kit
yarn link "@stoplight/ui-kit"
```
