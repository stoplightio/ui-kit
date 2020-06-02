/**
 * NOTE: any components with meaningful external dependencies should NOT be exported here. (general guideline is if dep is over 40kb)
 * Library users will need to `import { Select } from '@stoplight/ui-kit/Select` them specifically.
 *
 * includes:
 * Icons
 * Select
 * Table
 * DateTime
 */

export * from './colors';
export * from './classes';

/**
 * COMPONENTS
 */
export * from './Code/CodeEditor';
export * from './Code/CodeViewer';
export * from './FormButton';
export * from './FormError';
export * from './FormInput';
// export * from './ScrollBox';
// export * from './ScrollBox';
export * from './SecretInput';
export * from './ThemeContainer';
export * from './AutoSizer';

/**
 * BLUEPRINT CORE
 */

// @ts-ignore we redefine classes above which conflicts with the classes export in blueprint
export * from '@blueprintjs/core';

/**
 * React Autosize Input
 *
 * There is a bug with Blueprint's EditableText component causing Chrome & Electron to get into an infinite loop while calculating the input's width. We should use react-autosize-input instead.
 *
 * See the following:
 *
 * https://github.com/palantir/blueprint/issues/2021
 * https://github.com/stoplightio/studio/issues/76
 */
export { default as AutosizeInput, AutosizeInputProps } from 'react-input-autosize';
