import * as React from 'react';
import { useDebounce } from 'use-debounce';
import * as yup from 'yup';

const noError: string[] = [];
const unknownError = ['Unknown error'];

export function useValidateSchema<T>(
  schema?: yup.Schema<T>,
  value?: T,
  { abortEarly, recursive }: yup.ValidateOptions = {},
) {
  const [debouncedValue] = useDebounce(value, 500);
  const isStale = debouncedValue != value;

  const [errors, setErrors] = React.useState<string[]>(noError);

  React.useEffect(() => {
    if (!schema) {
      setErrors(noError);
      return;
    }
    schema
      .validate(debouncedValue, { strict: true, abortEarly, recursive }) // to avoid taking a useEffect dependency on validateOpts that is an object
      .then(() => {
        setErrors(noError);
      })
      .catch(e => {
        setErrors(e.errors || unknownError);
      });
  }, [schema, debouncedValue, abortEarly, recursive]);

  return { errors, isStale };
}
