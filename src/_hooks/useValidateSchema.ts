import * as React from 'react';
import * as yup from 'yup';

export function useValidateSchema(
  schema?: yup.Schema<any>,
  value?: any,
  { abortEarly, recursive, context }: yup.ValidateOptions = {},
): string[] {
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!schema) {
      setErrors([]);
      return;
    }
    schema
      .validate(value, { strict: true, abortEarly, recursive, context }) // to avoid taking a useEffect dependency on validateOpts that is an object
      .then(() => setErrors([]))
      .catch(e => setErrors(e.errors || ['Input is invalid']));
  }, [schema, value, abortEarly, recursive, context]);

  return errors;
}
