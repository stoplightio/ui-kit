import * as React from 'react';
// TODO: should probably use ajv and json schema
import * as yup from 'yup';

export const useValidateSchema = (schema?: yup.Schema<any>, value?: any, validateOpts?: yup.ValidateOptions) => {
  const [validationErrors, setValidationErrors] = React.useState<null | string[]>(null);

  React.useEffect(() => {
    setValidationErrors(null);

    if (!schema) return;

    try {
      schema.validateSync(value, validateOpts);
    } catch (e) {
      setValidationErrors(e.errors || ['Input is invalid']);
    }
  }, [value, schema]);

  return validationErrors;
};
