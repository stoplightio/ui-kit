const Json = require('@stoplight/json');

const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');
const isPlainObject = require('lodash/isPlainObject');

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

const JsonToScss = (json: any): string => {
  const parsed = Json.safeParse(json);

  return Object.keys(parsed)
    .map(key => `$${key}: ${parseValue(json[key])};`)
    .join('\n');
};

/**
 * EXPORTS
 */
export { JsonToScss };
