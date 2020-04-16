import * as React from 'react';
import { useDebounce } from 'use-debounce';
import * as yup from 'yup';

const noError: string[] = [];
const unknownError = ['Unknown error'];

export function useValidateSchema<T>(
  schema?: yup.Schema<T>,
  value?: T,
  { abortEarly, recursive }: yup.ValidateOptions = {},
  debounceDelay: number = 500,
) {
  const [debouncedValue] = useDebounce(value, debounceDelay);
  const [errors, setErrors] = React.useState<string[]>(noError);
  const [isValidating, setIsValidating] = React.useState(false);

  React.useEffect(() => {
    if (!schema) {
      setErrors(noError);
      return;
    }

    setIsValidating(true);

    schema
      .validate(debouncedValue, { strict: true, abortEarly, recursive }) // to avoid taking a useEffect dependency on validateOpts that is an object
      .then(() => setErrors(noError))
      .catch(e => setErrors(e.errors || unknownError))
      .finally(() => setIsValidating(false));
  }, [schema, debouncedValue, abortEarly, recursive]);

  return [{ errors, isValidating }];
}
