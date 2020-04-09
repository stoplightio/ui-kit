import * as React from 'react';
import * as yup from 'yup';

const noError: string[] = [];
const unknownError = ['Unknown error'];

export function useValidateSchema<T>(
  schema?: yup.Schema<T>,
  value?: T,
  { abortEarly, recursive }: yup.ValidateOptions = {},
): string[] {
  const [errors, setErrors] = React.useState<string[]>(noError);

  React.useEffect(() => {
    if (!schema) {
      setErrors(noError);
      return;
    }
    schema
      .validate(value, { strict: true, abortEarly, recursive }) // to avoid taking a useEffect dependency on validateOpts that is an object
      .then(() => {
        setErrors(noError);
      })
      .catch(e => {
        setErrors(e.errors || unknownError);
      });
  }, [schema, value, abortEarly, recursive]);

  return errors;
}
