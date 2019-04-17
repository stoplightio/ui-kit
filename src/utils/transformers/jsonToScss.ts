const Json = require('@stoplight/json');

const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');
const isPlainObject = require('lodash/isPlainObject');
const prettier = require('prettier');

/**
 * JSON TO SCSS
 */
// this includes null, NaN, undefined, empty strings, and Functions
const isInvalidSCSS = (value: any): boolean => isEmpty(value) && !isFinite(value);

// cleans the scss value
const parseValue = (value: any): any => {
  // instead of removing entirely we return an empty string so lists keep proper indexing
  if (isInvalidSCSS(value)) {
    return `''`;
  }

  if (isArray(value)) {
    return `(${value.map((item: any) => parseValue(item)).join(',')})`;
  }

  if (isPlainObject(value)) {
    return `(${Object.keys(value)
      .map(key => `${key}: ${parseValue(value[key])}`)
      .join(',')})`;
  }

  return value;
};

const JsonToScss = (json: any, opts: { default?: boolean; prettier?: boolean } = {}): string => {
  const parsed = Json.safeParse(json);

  const scss = Object.keys(parsed)
    .map(key => `$${key}: ${parseValue(json[key])}${opts.default ? ' !default' : ''};`)
    .join('\n');

  return opts.prettier ? prettier.format(scss, { parser: 'scss' }) : scss;
};

/**
 * EXPORTS
 */
export { JsonToScss };
