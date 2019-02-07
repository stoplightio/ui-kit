import isPropValid from '@emotion/is-prop-valid';
import { ValueKeyIteratee } from 'lodash';

export const validPropsPicker: ValueKeyIteratee<any> = (value, prop) => {
  const includeProp = isPropValid(prop);

  if (!includeProp && process.env.NODE_ENV !== 'production') {
    console.error(`Invalid prop ${prop} given.`);
  }

  return includeProp;
};
