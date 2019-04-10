const cleanDeep = require('clean-deep');

/**
 * CLEAN KNOBS
 * use this function for better cleaning of the props, we want to strip out undefined/falsey value (except zero)
 * empty props normally get passed to the storybook component which messes with default values
 */

export function cleanKnobs<T = {}>(props: any): Partial<T> {
  return cleanDeep(props, {
    emptyArrays: false,
    emptyObjects: false,
    emptyStrings: true,
    nullValues: true,
    undefinedValues: true,
  });
}
