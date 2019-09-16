import * as React from 'react';
import * as yup from 'yup';

export function useValidateSchema(schema?: yup.Schema<any>, value?: any, validateOpts?: yup.ValidateOptions): string[] {
  return React.useMemo(() => {
    if (!schema) return [];

    try {
      schema.validateSync(value, validateOpts);
    } catch (e) {
      return e.errors || ['Input is invalid'];
    }

    return [];
  }, [schema, value, validateOpts]);
}
